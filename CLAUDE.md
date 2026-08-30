# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VFX Reference Platform - a Jekyll-based static site documenting reference platform specifications for VFX/animation software. Hosted with Github Pages and published to https://vfxplatform.com. 

**Stack:** Jekyll 4.3 (Ruby), Tailwind CSS 3.4, PostCSS, vanilla JS

## Documentation

The README.md file contains a friendly guide on how to administer the site aimed at the site adminitration team. It should be updated as features are added or changed so that it always accurately reflects up to date instructions on how to update the site content.

## Development Commands

```bash
# Install dependencies
npm install && bundle install

# Development (CSS watch + Jekyll livereload on localhost:4000)
npm run dev

# Production build
npm run build

# Individual commands
npm run build:css      # One-time Tailwind build
npm run watch:css      # Watch mode for CSS
bundle exec jekyll serve --livereload
```

## Architecture

**Data-driven content:** Platform specs live in YAML files, not code. Most updates are data edits. Do NOT change the schema without explicit direction or approval since this data is also relied upon by 3rd parties.

```
_data/
├── platforms/CY20XX.yml  # Version specs per year (CY2014-CY2027)
├── components.yml        # Component metadata and categories
├── faq.yml              # FAQ Q&A content
├── footer.yml           # Footer content (description, resources, contact)
├── navigation.yml       # Main navigation menu
├── notes.yml            # Technical footnotes
├── status_updates.yml   # Status updates shown on homepage
└── useful_links.yml     # Useful links section on homepage
```

**Key config in `_config.yml`:**
- `current_year: 2027` - Active platform year
- `supported_years_count: 4` - Total number of years shown in tables, except on pages where all platform history is shown.

**Layouts:**
- `_layouts/default.html` - Base page layout (centered content container)
- `_layouts/home.html` - Full-width layout used by pages with hero sections

**Key templates and assets:**
- `_includes/platform-table.html` - Main specs table component
- `assets/css/main.css` - Tailwind directives + custom components
- `assets/js/year-comparison.js` - Compare page logic
- `assets/js/component-detail.js` - Component detail page
- `assets/js/table-collapse.js` - Collapsible table categories
- `assets/js/note-popover.js` - Note tooltip/bottom sheet
- `assets/js/dark-mode.js` - Dark mode toggle persistence

## Common Tasks

**Add new platform year:** Create `_data/platforms/CY[YEAR].yml` following existing schema. Tables auto-render it.

**Update component versions:** Edit `_data/platforms/CY[YEAR].yml` - no code changes needed.

**Add FAQ entry:** Append to `_data/faq.yml`

**Add technical note:** Add to `_data/notes.yml`, reference with `note:` key in platform data

**Update footer content:** Edit `_data/footer.yml`

**Update status updates:** Edit `_data/status_updates.yml`

**Update useful links:** Edit `_data/useful_links.yml`

## Platform Data Schema

Each `_data/platforms/CY[YEAR].yml` contains:
- `year`, `status`, `last_updated`
- `linux`: gcc/glibc versions with `min_max: true` flag
- `macos`: deployment_target with optional `note:` reference
- `windows`: visual_studio, sdk versions
- `components`: python, qt, pyqt, pyside, numpy, imath, openexr, ptex, opensubdiv, openvdb, alembic, fbx, opencolorio, aces, boost, onetbb, onemkl, cpp_standard

## Deployment

Push to main branch triggers GitHub Actions (`.github/workflows/deploy.yml`) which builds and deploys to GitHub Pages automatically. A separate `.github/workflows/deploy-staging.yml` workflow deploys the staging branch for preview.

## Design Context

### Users
VFX and animation industry professionals — pipeline TDs, software engineers, studio CTOs, and open-source library maintainers. They visit to check version requirements for their builds, verify compatibility, and plan upgrades. They want to find specific version numbers quickly and move on. Many are deeply technical and value precision over polish.

### Brand Personality
**Authoritative, precise, trustworthy.** This is an industry standard reference — the definitive source of truth for VFX software compatibility. The design should communicate reliability and institutional credibility without being stuffy.

### Emotional Goals
- **Confidence & trust:** Users should immediately feel this is the canonical, well-maintained reference
- **Efficiency & focus:** Information should be scannable and fast to find — no friction between the user and the data they need

### Aesthetic Direction
**Minimal & refined.** The current conservative, information-dense design is appropriate for this audience. Enhancements should add subtle polish — better spacing, purposeful micro-interactions, and consistency — to make it feel premium without becoming flashy. Think "well-typeset technical document" not "marketing site."

### Design Principles
1. **Data first** — Every design decision should make version data easier to find, read, and compare. Decoration must never compete with content.
2. **Quiet confidence** — Use restraint. Subtle animations, muted transitions, and precise spacing convey quality better than bold effects.
3. **Consistency over novelty** — Unify existing patterns rather than introducing new ones. The same spacing, border radii, and color usage everywhere.
4. **Respect the professional** — No unnecessary tooltips, onboarding flows, or explanatory UI. Users are experts who know what they're looking for.
5. **Light and dark parity** — Both themes should feel equally considered and polished, not like one is an afterthought.

### Color Palette (existing)
- **Primary:** Blue-600 (`#2563EB`) / Dark: Blue-400 (`#60A5FA`)
- **Surface:** White / Dark: Gray-900 (`#111827`)
- **Text:** Gray-900 / Dark: Gray-100
- **Borders:** Gray-200 / Dark: Gray-700
- **Accent (changes):** Amber-50 / Dark: Amber-900/30
- **Footer:** Gray-900 / Dark: Gray-950

### Typography
- **Sans:** Inter (with OpenType features cv01, cv02 enabled)
- **Mono:** JetBrains Mono / Fira Code
