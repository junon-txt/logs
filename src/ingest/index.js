/**
 * Stage 1: Content Ingestion
 * Loads raw markdown files from the content directory
 */

import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONTENT_DIR = join(__dirname, '../../content');

/**
 * Recursively find all markdown files in a directory
 */
async function findMarkdownFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await findMarkdownFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile() && extname(entry.name) === '.md') {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Ingest all markdown files from content directory
 */
export async function ingest() {
  try {
    const files = await findMarkdownFiles(CONTENT_DIR);
    const results = [];

    for (const filePath of files) {
      const content = await readFile(filePath, 'utf-8');
      const filename = filePath.split('/').pop();
      
      results.push({
        path: filePath,
        filename,
        content
      });
    }

    return results;
  } catch (error) {
    console.error('Error during ingestion:', error);
    throw error;
  }
}

