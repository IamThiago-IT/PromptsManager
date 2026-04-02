import { useEffect, useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import PromptEditor from "./components/PromptEditor";
import ToastContainer from "./components/ToastContainer";
import ConfirmDialog from "./components/ConfirmDialog";
import { useToast } from "./hooks/useToast";
import { storage } from "./services/storage";
import type { Prompt } from "./types/Prompt";
import { createPrompt } from "./types/Prompt";
import "./index.css";

export type SortMode = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'favorites';

export default function App() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selected, setSelected] = useState<Prompt | null>(null);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortMode, setSortMode] = useState<SortMode>('date-desc');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterTag, setFilterTag] = useState<string>('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { toasts, addToast, removeToast } = useToast();

  // Load prompts on mount
  useEffect(() => {
    storage.loadPrompts().then((data) => {
      // Migrate old prompts that lack new fields
      const migrated = data.map((p: any) => ({
        id: p.id,
        title: p.title ?? '',
        content: p.content ?? '',
        category: p.category ?? '',
        tags: p.tags ?? [],
        isFavorite: p.isFavorite ?? false,
        createdAt: p.createdAt ?? Date.now(),
        updatedAt: p.updatedAt ?? Date.now(),
        order: p.order ?? Date.now(),
      })) as Prompt[];
      setPrompts(migrated);
      setIsLoaded(true);
    });
  }, []);

  // Auto-save whenever prompts change (after initial load)
  useEffect(() => {
    if (!isLoaded) return;
    storage.savePrompts(prompts);
  }, [prompts, isLoaded]);

  // All unique categories
  const allCategories = Array.from(new Set(prompts.map((p) => p.category).filter(Boolean)));
  // All unique tags
  const allTags = Array.from(new Set(prompts.flatMap((p) => p.tags)));

  const handleSave = useCallback(
    (title: string, content: string, category: string, tags: string[]) => {
      if (!title.trim()) {
        addToast("Título não pode estar vazio.", "error");
        return;
      }

      if (selected) {
        const updated: Prompt = {
          ...selected,
          title,
          content,
          category,
          tags,
          updatedAt: Date.now(),
        };
        setPrompts((prev) =>
          prev.map((p) => (p.id === selected.id ? updated : p))
        );
        setSelected(updated);
      } else {
        const newPrompt = createPrompt(title, content, { category, tags });
        setPrompts((prev) => [newPrompt, ...prev]);
        setSelected(newPrompt);
      }
    },
    [selected]
  );

  const handleAutoSave = useCallback(
    (title: string, content: string, category: string, tags: string[]) => {
      if (!title.trim()) return;

      if (selected) {
        const updated: Prompt = {
          ...selected,
          title,
          content,
          category,
          tags,
          updatedAt: Date.now(),
        };
        setPrompts((prev) =>
          prev.map((p) => (p.id === selected.id ? updated : p))
        );
        setSelected(updated);
      }
    },
    [selected]
  );

  const handleDeleteRequest = useCallback((id: string) => {
    setDeleteTarget(id);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteTarget) return;
    setPrompts((prev) => prev.filter((p) => p.id !== deleteTarget));
    if (selected?.id === deleteTarget) setSelected(null);
    setDeleteTarget(null);
    addToast("Prompt excluído.", "info");
  }, [deleteTarget, selected, addToast]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      const prompt = prompts.find((p) => p.id === id);
      if (prompt) setSelected(prompt);
    },
    [prompts]
  );

  const handleNew = useCallback(() => setSelected(null), []);

  const handleToggleFavorite = useCallback(
    (id: string) => {
      setPrompts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, isFavorite: !p.isFavorite, updatedAt: Date.now() } : p
        )
      );
      // Also update selected if it's the toggled one
      setSelected((prev) =>
        prev && prev.id === id ? { ...prev, isFavorite: !prev.isFavorite } : prev
      );
    },
    []
  );

  const handleCopy = useCallback(() => {
    if (selected?.content) {
      navigator.clipboard.writeText(selected.content);
      addToast("Conteúdo copiado!", "success");
    }
  }, [selected, addToast]);

  // Export
  const handleExport = useCallback(
    async (format: 'json' | 'markdown') => {
      try {
        const data = await storage.exportPrompts(prompts, format);
        const ext = format === 'json' ? 'json' : 'md';
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prompts-export.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
        addToast(`Prompts exportados como ${format.toUpperCase()}.`, "success");
      } catch {
        addToast("Erro ao exportar prompts.", "error");
      }
    },
    [prompts, addToast]
  );

  // Import
  const handleImport = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        const imported = await storage.importPrompts(text);
        // Merge: add imported prompts that don't exist by ID
        setPrompts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newOnes = imported
            .filter((p) => !existingIds.has(p.id))
            .map((p) => ({
              ...p,
              category: p.category ?? '',
              tags: p.tags ?? [],
              isFavorite: p.isFavorite ?? false,
              createdAt: p.createdAt ?? Date.now(),
              updatedAt: p.updatedAt ?? Date.now(),
              order: p.order ?? Date.now(),
            }));
          return [...newOnes, ...prev];
        });
        addToast(`${imported.length} prompts importados.`, "success");
      } catch (err: any) {
        addToast(err.message || "Erro ao importar.", "error");
      }
    },
    [addToast]
  );

  // Backup
  const handleBackup = useCallback(async () => {
    // In web mode, just export as JSON
    await handleExport('json');
  }, [handleExport]);

  // Filtering & sorting
  const filteredPrompts = prompts
    .filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q);
      const matchesCategory = !filterCategory || p.category === filterCategory;
      const matchesTag = !filterTag || p.tags.includes(filterTag);
      return matchesSearch && matchesCategory && matchesTag;
    })
    .sort((a, b) => {
      switch (sortMode) {
        case 'date-desc':
          return b.updatedAt - a.updatedAt;
        case 'date-asc':
          return a.updatedAt - b.updatedAt;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'favorites':
          if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
          return b.updatedAt - a.updatedAt;
        default:
          return 0;
      }
    });

  return (
    <div className="app">
      <Sidebar
        isOpen={isSidebarOpen}
        onOpen={() => setIsSidebarOpen(true)}
        onClose={() => setIsSidebarOpen(false)}
        prompts={filteredPrompts}
        onSearch={setSearch}
        onSelect={handleSelect}
        onDelete={handleDeleteRequest}
        onNew={handleNew}
        onToggleFavorite={handleToggleFavorite}
        sortMode={sortMode}
        onSortChange={setSortMode}
        categories={allCategories}
        filterCategory={filterCategory}
        onFilterCategory={setFilterCategory}
        tags={allTags}
        filterTag={filterTag}
        onFilterTag={setFilterTag}
        onExport={handleExport}
        onImport={handleImport}
        onBackup={handleBackup}
      />
      <PromptEditor
        prompt={selected}
        onSave={handleSave}
        onAutoSave={handleAutoSave}
        onCopy={handleCopy}
        categories={allCategories}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Excluir prompt"
        message="Tem certeza que deseja excluir este prompt? Esta ação não pode ser desfeita."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
