# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2026-04-02

### Added
- Docker support for web deployment (Dockerfile, docker-compose.yml, nginx.conf)
- UML diagrams documentation (use case, class, sequence, architecture)
- Future improvements document in `docs/update/melhorias-futuras.md`

### Fixed
- TypeScript build errors (unused `require` and `handleReorder`)

### Changed
- Netlify deployment configuration (netlify.toml)
- Build script for web mode

## [1.0.0] - 2026-03-XX

### Added
- React-based UI with Vite
- Electron desktop application support
- Prompt management (CRUD)
  - Create, read, update, delete prompts
  - Title, content, category, tags
  - Favorites system
- Search and filtering
  - Search by title/content
  - Filter by category
  - Filter by tags
- Sorting (date, title, favorites)
- Import/Export functionality
  - JSON format
  - Markdown format
- Auto-save feature
- Backup system (Electron mode)
- Markdown preview
- Toast notifications
- Confirm dialogs
- Multi-language README (EN, ES, ZH, FR, JA)
- Tailwind CSS integration

### Tech Stack
- React 18
- TypeScript
- Vite
- Electron
- Tailwind CSS
- Lucide Icons

---

## Release Notes Archive

### v2.0.0 - Docker & Documentation Release
This release focuses on deployment options and documentation:
- Added Docker configuration for containerized web deployment
- Created comprehensive UML diagrams
- Fixed TypeScript compilation issues for Netlify

### v1.0.0 - Initial Release
Complete rewrite with modern stack:
- Full prompt management system
- Desktop and web compatibility
- Modern dark theme UI