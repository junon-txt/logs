/**
 * Pipeline Orchestrator
 * Runs all processing stages in sequence
 */

import { ingest } from './ingest/index.js';
import { parse } from './parse/index.js';
import { normalize } from './normalize/index.js';
import { index } from './index/index.js';

/**
 * Run the complete pipeline
 */
export async function runPipeline() {
  console.log('Starting pipeline...');
  
  // Stage 1: Ingest
  console.log('  → Ingesting content...');
  const rawFiles = await ingest();
  console.log(`  ✓ Found ${rawFiles.length} file(s)`);
  
  // Stage 2: Parse
  console.log('  → Parsing frontmatter...');
  const parsed = parse(rawFiles);
  console.log(`  ✓ Parsed ${parsed.length} entry/entries`);
  
  // Stage 3: Normalize
  console.log('  → Normalizing entries...');
  const normalized = normalize(parsed);
  console.log(`  ✓ Normalized ${normalized.length} entry/entries`);
  
  // TODO: Stage 4: Enrich (reading time, media extraction, IDs)
  
  // Stage 5: Index (chronological sorting, previous/next, tag stats)
  console.log('  → Indexing entries...');
  const indexed = index(normalized);
  console.log(`  ✓ Indexed ${indexed.entries.length} entry/entries`);
  console.log(`  ✓ Found ${indexed.tagStats.length} unique tag(s)`);
  
  console.log('Pipeline complete!');
  return indexed;
}

// Run if called directly (for testing)
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('pipeline.js')) {
  runPipeline()
    .then(entries => {
      console.log(`\nProcessed ${entries.length} entry/entries`);
    })
    .catch(error => {
      console.error('Pipeline failed:', error);
      process.exit(1);
    });
}

