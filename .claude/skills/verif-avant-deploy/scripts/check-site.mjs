#!/usr/bin/env node
// Vérifie le site généré dans _site/ avant un push sur main (= mise en prod Netlify).
// Usage : node .claude/skills/verif-avant-deploy/scripts/check-site.mjs [--no-build]
// Code de sortie 1 s'il y a au moins une ERREUR (les AVERTISSEMENTS ne bloquent pas).
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(new URL("../../../../", import.meta.url).pathname);
const site = join(root, "_site");
const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file} : ${msg}`);
const warn = (file, msg) => warnings.push(`${file} : ${msg}`);

// 1. Build de production
if (!process.argv.includes("--no-build")) {
  try {
    execSync("npm run build", { cwd: root, stdio: "pipe" });
  } catch (e) {
    console.error("ERREUR : le build a échoué.\n" + (e.stdout || "") + (e.stderr || ""));
    process.exit(1);
  }
}
if (!existsSync(site)) {
  console.error("ERREUR : _site/ introuvable. Lance d'abord `npm run build`.");
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

// 2. Sources des articles : front-matter obligatoire
const postsDir = join(root, "src/blog/posts");
if (existsSync(postsDir)) {
  for (const f of readdirSync(postsDir).filter((f) => f.endsWith(".md"))) {
    const rel = `src/blog/posts/${f}`;
    const src = readFileSync(join(postsDir, f), "utf8");
    const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) { err(rel, "pas de front-matter en tout début de fichier (le fichier doit commencer par ---)"); continue; }
    for (const key of ["title", "description", "layout"]) {
      if (!new RegExp(`^${key}\\s*:`, "m").test(fm[1])) err(rel, `front-matter : « ${key} » manquant`);
    }
    if (!/^\d{4}-\d{2}-\d{2}-/.test(f) && !/^date\s*:/m.test(fm[1])) warn(rel, "ni date dans le nom de fichier, ni « date » dans le front-matter");
  }
}

// 3. Pages HTML générées
const css = existsSync(join(site, "assets/main.css")) ? readFileSync(join(site, "assets/main.css"), "utf8") : "";
if (!css) err("_site/assets/main.css", "CSS compilé absent");
const cssEscape = (c) => c.replace(/([^a-zA-Z0-9_-])/g, "\\$1");
const unknownClasses = new Map();

const linkExists = (href) => {
  const path = decodeURI(href.split(/[?#]/)[0]);
  const target = join(site, path);
  if (path.endsWith("/")) return existsSync(join(target, "index.html"));
  return existsSync(target) || existsSync(join(target, "index.html"));
};

for (const file of walk(site).filter((f) => f.endsWith(".html"))) {
  const rel = relative(root, file);
  const html = readFileSync(file, "utf8");
  const text = (s) => s.replace(/<[^>]+>/g, "").trim();

  const title = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!title || !text(title[1]) || /^\.+$/.test(text(title[1]))) err(rel, `<title> vide ou provisoire (« ${title ? text(title[1]) : ""} »)`);
  else if (text(title[1]).length > 60) warn(rel, `<title> long (${text(title[1]).length} car., viser ≤ 60)`);

  const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (!desc || !desc[1].trim()) err(rel, "meta description absente");
  else if (desc[1].length < 50 || desc[1].length > 160) warn(rel, `meta description de ${desc[1].length} car. (viser 50–160)`);

  if (!/<html[^>]*\blang=/i.test(html)) err(rel, "attribut lang manquant sur <html>");

  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1 === 0) err(rel, "aucun <h1>");
  if (h1 > 1) warn(rel, `${h1} balises <h1> (une seule recommandée)`);

  for (const img of html.match(/<img\b[^>]*>/gi) || []) {
    if (!/\balt\s*=\s*"[^"]+"/i.test(img)) err(rel, `image sans alt : ${img.slice(0, 80)}`);
  }

  for (const [, href] of html.matchAll(/\b(?:href|src)="([^"]+)"/gi)) {
    if (/^(https?:|mailto:|tel:|#|\/\/|data:|javascript:)/i.test(href)) continue;
    if (!href.startsWith("/")) { warn(rel, `lien relatif « ${href} » (préférer un chemin absolu /…)`); continue; }
    if (!linkExists(href)) err(rel, `lien interne cassé : ${href}`);
  }

  for (const [, action] of html.matchAll(/<form[^>]*action="([^"]*)"/gi)) {
    if (/x{4,}|example|TODO/i.test(action)) err(rel, `formulaire avec une URL provisoire : ${action}`);
  }
  if (/^\s*```|^#{1,6} .*\.md\s*$/m.test(text(html))) warn(rel, "du Markdown brut (``` ou ####) apparaît dans la page");

  if (css) {
    for (const [, cls] of html.matchAll(/\bclass="([^"]*)"/gi)) {
      for (const c of cls.split(/\s+/).filter(Boolean)) {
        if (/^\d|[{}]|^language-/.test(c)) continue;
        const selector = new RegExp("\\." + cssEscape(c).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![a-zA-Z0-9_\\\\-])");
        if (!selector.test(css)) {
          if (!unknownClasses.has(c)) unknownClasses.set(c, new Set());
          unknownClasses.get(c).add(rel);
        }
      }
    }
  }
}

for (const [c, files] of unknownClasses) {
  warn([...files].join(", "), `classe « ${c} » utilisée mais absente du CSS (sans effet)`);
}

// 4. Rapport
const print = (label, list) => list.length && console.log(`\n${label} (${list.length})\n` + list.map((l) => "  - " + l).join("\n"));
print("ERREURS", errors);
print("AVERTISSEMENTS", warnings);
console.log(`\n${errors.length ? "❌ Déploiement déconseillé" : "✅ Prêt à déployer"} — ${errors.length} erreur(s), ${warnings.length} avertissement(s).`);
process.exit(errors.length ? 1 : 0);
