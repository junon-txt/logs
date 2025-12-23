/**
 * Stage 3: Normalization
 * Enforces consistency and applies defaults
 */

/**
 * Validate and normalize date field
 */
function normalizeDate(metadata, filename) {
  let dateValue = metadata.date;
  
  // Try to extract date from filename if not in metadata
  if (!dateValue) {
    const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      dateValue = dateMatch[1];
    } else {
      console.warn(`Warning: No date found for ${filename}, using today's date`);
      dateValue = new Date().toISOString().split('T')[0];
    }
  }

  // Handle Date objects (gray-matter may parse dates)
  if (dateValue instanceof Date) {
    dateValue = dateValue.toISOString().split('T')[0];
  }

  // Convert to string if not already
  if (typeof dateValue !== 'string') {
    dateValue = String(dateValue);
  }

  // Ensure date is in ISO format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateValue)) {
    console.warn(`Warning: Invalid date format for ${filename}: ${dateValue}`);
    // Try to parse and reformat
    try {
      const parsed = new Date(dateValue);
      if (isNaN(parsed.getTime())) {
        throw new Error('Invalid date');
      }
      dateValue = parsed.toISOString().split('T')[0];
    } catch (e) {
      console.warn(`Warning: Could not parse date, using today's date`);
      dateValue = new Date().toISOString().split('T')[0];
    }
  }

  return dateValue;
}

/**
 * Normalize a single entry
 */
function normalizeEntry(entry) {
  const normalized = {
    ...entry,
    metadata: { ...entry.metadata }
  };

  // Normalize date
  normalized.metadata.date = normalizeDate(normalized.metadata, entry.filename);

  // Set defaults
  if (!normalized.metadata.visibility) {
    normalized.metadata.visibility = 'public';
  }

  // Ensure tags is an array if present
  if (normalized.metadata.tags && !Array.isArray(normalized.metadata.tags)) {
    normalized.metadata.tags = [normalized.metadata.tags];
  }

  // Preserve all unknown fields (they're already in metadata)

  return normalized;
}

/**
 * Normalize all entries
 */
export function normalize(parsedEntries) {
  return parsedEntries.map(normalizeEntry);
}

