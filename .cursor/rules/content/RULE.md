---
description: Guidelines for how to handle content
alwaysApply: false
---

##  Content Contract

### Content Principles

- Plain-text first
- Human-readable
- Portable across systems
- Decoupled from rendering and styling

Content must not depend on:
- JavaScript
- React / JSX
- CSS layout assumptions
- Hosting-specific features

---

### File Structure

- One diary entry per file
- One file per day (or per entry)

**Recommended naming:**
```
YYYY-MM-DD.md
```

**Recommended directory layout:**
```
content/
  2026/
    2026-03-14.md
    2026-03-15.md
```

- Directory structure encodes time only
- Folder structure is organizational, not semantic

---

### Metadata (Frontmatter)

Metadata is **descriptive**, never behavioral.

#### Required metadata

- `date`: ISO format (`YYYY-MM-DD`)

#### Optional metadata (examples)

- `location`
- `trip`
- `mood`
- `tags`
- `language`
- `weather`
- `visibility` (e.g. `public`, `draft`, `private`)

Rules:
- Scalar values or simple lists only
- No nested objects
- Unknown fields must be preserved

> Metadata may grow, but existing meanings must never change.

---

### Body Format

- CommonMark-compatible Markdown
- Readable even if all extensions are removed
- Paragraphs must remain meaningful in plain text

---

### Custom Tags / DSL

Custom constructs are allowed under strict rules:

- Must be ignorable by humans
- Must degrade gracefully
- Must contain no logic (no conditionals, loops, or layout hints)

Custom tags describe *what exists*, never *how it appears*.


### Editing Expectations

- Written primarily on mobile
- Imperfect formatting is acceptable
- Manual edits are expected

Validation must be tolerant, not brittle.

---
