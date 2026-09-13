const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Copier /public -> /_site (CSS compilé, images, favicon)
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  // Filtre date pour Nunjucks : {{ post.date | date("dd/MM/yyyy") }}
  eleventyConfig.addFilter("date", (d, fmt = "dd/MM/yyyy") =>
    DateTime.fromJSDate(d).setZone("Europe/Paris").toFormat(fmt)
  );

  // Collection des articles de blog, du plus récent au plus ancien
  eleventyConfig.addCollection("posts", (c) =>
    c.getFilteredByGlob("src/blog/posts/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
