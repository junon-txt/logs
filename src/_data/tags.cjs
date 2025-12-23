/**
 * Tags data file for Eleventy
 * Provides tag statistics for the landing page
 */

async function loadTags() {
  const { runPipeline } = await import('../pipeline.js');
  const result = await runPipeline();
  return result.tagStats;
}

module.exports = loadTags;

