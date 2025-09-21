



module.exports = function(eleventyConfig) {
  // Dossier public en passthrough (CSS compilé, images…)
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  // Collection blog (toutes les pages dans src/blog/posts)
  eleventyConfig.addCollection("posts", collectionApi =>
    collectionApi.getFilteredByGlob("src/blog/posts/*.md").sort((a,b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
