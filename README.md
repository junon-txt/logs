# logs

A static-first diary web application for publishing personal entries over time.

## Overview

This is a modular, extensible diary application that separates content from presentation. Content is authored in Markdown files and processed through a pipeline that generates a static website.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the site:**
   ```bash
   npm run build
   ```

3. **Serve locally (with auto-reload):**
   ```bash
   npm run serve
   ```

4. **Open in browser:**
   Navigate to `http://localhost:8080`

## Project Structure

```
logs/
├── content/          # Source of truth - raw markdown files
├── media/            # Media assets (images, etc.)
├── src/
│   ├── ingest/       # Stage 1: Load raw files
│   ├── parse/        # Stage 2: Extract frontmatter + body
│   ├── normalize/    # Stage 3: Enforce consistency
│   ├── enrich/       # Stage 4: Derived data (future)
│   ├── index/        # Stage 5: Build indexes (future)
│   ├── _data/        # Eleventy data files
│   ├── _includes/    # Eleventy templates
│   ├── pages/        # Eleventy page templates
│   └── assets/       # Static assets (CSS, JS)
└── dist/             # Generated static site
```

## Adding Content

Create markdown files in `content/` with the format `YYYY-MM-DD.md`:

```markdown
---
date: 2026-03-14
location: Beijing, China
trip: china-2026
tags: [travel, food]
---

# Your Entry Title

Your content here in Markdown format.
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## Development

- **Build:** `npm run build` - Runs pipeline and generates static site
- **Serve:** `npm run serve` - Builds and serves with auto-reload
- **Dev:** `npm run dev` - Alias for `serve`

## Deployment

This site is configured for automatic deployment to GitHub Pages.

### Setup GitHub Pages

1. **Enable GitHub Pages in repository settings:**
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"

2. **Push to main branch:**
   - The GitHub Actions workflow will automatically:
     - Install dependencies
     - Build the site
     - Deploy to GitHub Pages
   - Your site will be available at `https://[username].github.io/logs/`

3. **Manual deployment:**
   - You can also trigger deployment manually from the Actions tab

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file in the `dist/` directory with your domain
2. Configure DNS records as per GitHub Pages documentation

## Current Status

**MVP Phase 1** - Core pipeline with single entry rendering:
- ✅ Content ingestion
- ✅ Frontmatter parsing
- ✅ Normalization
- ✅ Basic Eleventy setup
- ✅ Single entry rendering

**Next Steps:**
- Enrichment (reading time, media extraction, IDs)
- Indexing (chronological sorting, previous/next links)
- Multiple entries support
- Styling improvements
