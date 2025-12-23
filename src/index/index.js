/**
 * Stage 5: Indexing
 * Builds navigation structures, relationships, and tag statistics
 */

/**
 * Extract title from markdown body (first h1 heading)
 */
function extractTitle(body) {
  if (!body) return null;
  
  // Try to find first h1 heading (# Title)
  const h1Match = body.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  
  // Fallback: try to find first line that looks like a title
  const lines = body.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.length > 0) {
      // Use first non-empty, non-heading line as fallback
      return trimmed.length > 60 ? trimmed.substring(0, 60) + '...' : trimmed;
    }
  }
  
  return null;
}

/**
 * Build tag statistics from entries
 */
function buildTagStats(entries) {
  const tagCounts = {};
  const tagEntries = {};

  entries.forEach(entry => {
    const tags = entry.metadata.tags || [];
    const title = extractTitle(entry.body) || entry.metadata.date;
    
    tags.forEach(tag => {
      if (!tagCounts[tag]) {
        tagCounts[tag] = 0;
        tagEntries[tag] = [];
      }
      tagCounts[tag]++;
      tagEntries[tag].push({
        id: entry.metadata.date,
        date: entry.metadata.date,
        title: title,
        location: entry.metadata.location,
        tags: entry.metadata.tags
      });
    });
  });

  // Convert to array and sort by count (most common first)
  const tagStats = Object.entries(tagCounts)
    .map(([tag, count]) => ({
      tag,
      count,
      entries: tagEntries[tag].sort((a, b) => b.date.localeCompare(a.date)) // Most recent first
    }))
    .sort((a, b) => b.count - a.count); // Most common first

  return tagStats;
}

/**
 * Build chronological index
 */
function buildChronologicalIndex(entries) {
  return [...entries].sort((a, b) => 
    b.metadata.date.localeCompare(a.metadata.date)
  );
}

/**
 * Add previous/next relationships
 * Navigation is contextual - entries link to others in the same epic (if epic is specified)
 */
function addNavigationLinks(entries) {
  const sorted = buildChronologicalIndex(entries);
  
  // Group entries by epic
  const entriesByEpic = {};
  entries.forEach(entry => {
    const epic = entry.metadata.epic || 'none';
    if (!entriesByEpic[epic]) {
      entriesByEpic[epic] = [];
    }
    entriesByEpic[epic].push(entry);
  });
  
  // Sort each epic's entries chronologically
  Object.keys(entriesByEpic).forEach(epic => {
    entriesByEpic[epic].sort((a, b) => 
      a.metadata.date.localeCompare(b.metadata.date)
    );
  });
  
  return sorted.map((entry) => {
    const result = { ...entry };
    const epic = entry.metadata.epic || 'none';
    const epicEntries = entriesByEpic[epic] || [];
    
    // Find this entry's position within its epic
    const epicIndex = epicEntries.findIndex(e => e.metadata.date === entry.metadata.date);
    
    if (epicIndex > 0) {
      // Has a previous entry in the same epic
      result.previous = {
        id: epicEntries[epicIndex - 1].metadata.date,
        date: epicEntries[epicIndex - 1].metadata.date,
        title: extractTitle(epicEntries[epicIndex - 1].body) || epicEntries[epicIndex - 1].metadata.date
      };
    }
    
    if (epicIndex < epicEntries.length - 1) {
      // Has a next entry in the same epic
      result.next = {
        id: epicEntries[epicIndex + 1].metadata.date,
        date: epicEntries[epicIndex + 1].metadata.date,
        title: extractTitle(epicEntries[epicIndex + 1].body) || epicEntries[epicIndex + 1].metadata.date
      };
    }
    
    return result;
  });
}

/**
 * Index entries: build navigation and statistics
 */
export function index(entries) {
  const indexed = addNavigationLinks(entries);
  const tagStats = buildTagStats(entries);
  const chronological = buildChronologicalIndex(entries);

  return {
    entries: indexed,
    tagStats,
    chronological
  };
}

