/**
 * Eleventy Configuration
 * Note: This file must be CommonJS (not ES modules) for Eleventy compatibility
 */

module.exports = function(eleventyConfig) {
  // Add markdown filter for rendering markdown strings
  const markdownIt = require("markdown-it");
  const md = new markdownIt();
  
  // Configure markdown-it to handle image paths correctly
  const defaultRender = md.renderer.rules.image || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  
  md.renderer.rules.image = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const src = token.attrGet('src');
    
    // If image path doesn't start with http/https, make it relative to media directory
    if (src && !src.startsWith('http') && !src.startsWith('/')) {
      // Assume images in markdown are relative to the entry's year directory
      // e.g., 14824019.jpg in 2026 entry becomes /media/2026/14824019.jpg
      const entryDate = env.entryDate || '';
      const year = entryDate.substring(0, 4);
      if (year) {
        token.attrSet('src', `/media/${year}/${src}`);
      }
    }
    
    return defaultRender(tokens, idx, options, env, self);
  };
  
  eleventyConfig.addFilter("markdown", function(content, entryDate) {
    const env = entryDate ? { entryDate } : {};
    return md.render(content || "", env);
  });
  
  // Add slug filter for URL-friendly strings
  eleventyConfig.addFilter("slug", function(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  });
  
  // Add limit filter to limit array length
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });
  
  // Add findEntry filter to find an entry by date/id
  eleventyConfig.addFilter("findEntry", function(entries, id) {
    return entries.find(e => e.metadata.date === id) || null;
  });
  
  // Get pathPrefix for GitHub Pages
  const pathPrefix = process.env.GITHUB_REPOSITORY ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] : '';
  
  // Add relativeUrl filter to make URLs work with GitHub Pages base path
  // When pathPrefix is set, Eleventy's url filter will prepend it, so we keep it
  // When pathPrefix is empty (local dev), we use the URL as-is
  eleventyConfig.addFilter("relativeUrl", function(url) {
    // If we have a pathPrefix, Eleventy's url filter should have already added it
    // So we just return the URL as-is (it will be /logs/... for GitHub Pages)
    return url;
  });
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy('src/assets');
  
  // Copy media directory
  eleventyConfig.addPassthroughCopy('media');

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ['njk', 'md', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    pathPrefix: pathPrefix
  };
};

