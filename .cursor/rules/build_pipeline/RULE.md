---
description: Guidelines for the build pipeline
alwaysApply: false
---
##  Build Pipeline

### 1 Pipeline Philosophy

> A deterministic compiler from Markdown to a static website.

- Linear stages
- Single responsibility per stage
- Re-runnable years later

---

### 2 Pipeline Stages

1. **Ingest** – Load raw files
2. **Parse** – Extract metadata, body, custom blocks
3. **Normalize** – Enforce consistency (dates, defaults)
4. **Enrich** – Derived data (media objects, reading time)
5. **Index** – Chronology, tags, relationships
6. **Render** – Framework-specific output
7. **Emit** – Write static files

---

### 3 Stage Rules

- Parsing is tolerant
- Normalization logs warnings, not errors
- Enrichment is reversible
- Rendering never mutates content
- Emission is deterministic

A diary build must never feel like CI for production software.

