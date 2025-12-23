/**
 * Stage 2: Parsing
 * Extracts frontmatter and body from markdown files
 */

import matter from 'gray-matter';

/**
 * Parse frontmatter and body from raw content
 */
export function parse(rawFiles) {
  return rawFiles.map(file => {
    try {
      const parsed = matter(file.content);
      
      return {
        metadata: parsed.data || {},
        body: parsed.content,
        filename: file.filename,
        path: file.path
      };
    } catch (error) {
      console.warn(`Warning: Failed to parse ${file.filename}:`, error.message);
      // Return with empty metadata if parsing fails
      return {
        metadata: {},
        body: file.content,
        filename: file.filename,
        path: file.path
      };
    }
  });
}

