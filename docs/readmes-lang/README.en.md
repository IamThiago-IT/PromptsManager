# 🚀 PromptsManager

Manage your prompts as assets, not loose text.

**PromptsManager** is an application to organize, categorize, and reuse prompts used with AI.
If you work with ChatGPT, Copilot, or any generative model, you know good prompts accumulate — and get lost.

This project solves that.

---

## 🧠 The Problem

Professional AI users:

* Scatter prompts across Notion, notepad, README, and chat history
* Waste time recreating prompts that already worked
* Have no version control
* Can't structure accumulated knowledge

Good prompts shouldn't rely on memory.

---

## 🎯 The Solution

PromptsManager centralizes your prompts in one place, allowing:

* 📂 Create and save prompts
* 🏷️ Organize by categories and tags
* 🔎 Search quickly
* ♻️ Reuse easily
* 🧩 Structure your AI strategy

The idea is simple: treat prompts as reusable code.

---

## 🏗️ Project Structure

```
/src
  /components      # Sidebar, PromptEditor, PromptList, MarkdownPreview, etc.
  /services        # storage.ts (localStorage + Electron IPC)
  /hooks           # useToast.ts
  /types           # Prompt.ts
  App.tsx          # Main component
```

---

## ✨ Features

- **Full CRUD** - Create, edit and delete prompts
- **Categories and Tags** - Organize your prompts with multiple tags
- **Favorites** - Mark your favorite prompts
- **Search and Filters** - Filter by category, tag or text
- **Sorting** - By date (recent/old), title (A-Z/Z-A) or favorites
- **Auto-save** - Auto-save after 2 seconds of inactivity
- **Undo/Redo** - Edit history in editor (Ctrl+Z / Ctrl+Y)
- **Markdown Preview** - View formatted content
- **Template Variables** - Support for `{{variable}}` with highlight
- **Import/Export** - JSON and Markdown
- **Backup** - Export all data
- **Responsive Interface** - Works on desktop and web
- **Desktop Mode** - Electron version for desktop

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/IamThiago-IT/PromptsManager.git
```

Enter the project folder:

```bash
cd PromptsManager
```

Install dependencies:

```bash
npm install
```

Run the project:

```bash
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-----------|
| `npm run dev` | Start development |
| `npm run dev:web` | Web only mode |
| `npm run dev:desktop` | Desktop mode (Electron) |
| `npm run build:web` | Build for web |
| `npm run build:desktop` | Desktop build (Electron) |
| `npm run lint` | Lint code |

---

## 📌 Roadmap

- [x] Category system
- [x] Tag system
- [x] Search and filters
- [x] Sorting (date, title, favorites)
- [x] Export and import (JSON/Markdown)
- [x] Auto-save
- [ ] Prompt versioning
- [ ] Automatic cloud backup
- [ ] Public sharing
- [ ] AI API integration

---

## 🧩 Use Cases

* Developer organizing technical prompts
* Creator saving content templates
* Student structuring educational prompts
* Professional automating AI tasks

---

## 🤝 Contributing

To improve:

1. Fork the project
2. Create a branch (`feature/feature-name`)
3. Commit your changes
4. Open a Pull Request

Issues are welcome.

---

## 📄 License

MIT License

---

## 🔥 Why this matters?

AI is a productivity multiplier.
But productivity without organization becomes rework.

If you use AI every day and still save prompts in notepad, you're operating below your potential.

Prompts are assets.
Manage them that way.