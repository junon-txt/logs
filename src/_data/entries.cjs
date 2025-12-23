/**
 * The Bridge: entries.cjs
 * This is the only coupling point between the pipeline and Eleventy
 * Note: Must be CommonJS (.cjs) because Eleventy's data system uses require()
 */

// Use dynamic import to load the ES module pipeline
async function loadEntries() {
  const { runPipeline } = await import('../pipeline.js');
  const result = await runPipeline();
  // Return just the entries array for backwards compatibility
  return result.entries || result;
}

// Eleventy data files can be async functions
module.exports = loadEntries;

