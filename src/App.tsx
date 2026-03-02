import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import PromptEditor from "./components/PromptEditor";
import "./index.css";
import "./categories.css";

type PromptVersion = {
  id: string;
  title: string;
  content: string;
  category: string;
  savedAt: string;
};

type Prompt = {
  id: string;
  title: string;
  content: string;
  category: string;
  versions: PromptVersion[];
};

type StoredPromptVersion = {
  id?: string;
  title?: string;
  content?: string;
  category?: string;
  savedAt?: string;
};

type StoredPrompt = {
  id: string;
  title: string;
  content: string;
  category?: string;
  versions?: StoredPromptVersion[];
};

function hasElectronPromptStorage(): boolean {
  return (
    typeof window.promptStorage?.load === "function" &&
    typeof window.promptStorage?.save === "function"
  );
}

function isStoredPrompt(value: unknown): value is StoredPrompt {
  if (typeof value !== "object" || value === null) return false;
  const prompt = value as Record<string, unknown>;
  return (
    typeof prompt.id === "string" &&
    typeof prompt.title === "string" &&
    typeof prompt.content === "string"
  );
}

async function loadPromptsFromWebApi(): Promise<StoredPrompt[]> {
  const response = await fetch("/api/prompts", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Falha ao carregar prompts.json (${response.status})`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error("Resposta invalida de /api/prompts (nao-JSON)");
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload.filter((item) => isStoredPrompt(item));
}

async function savePromptsToWebApi(prompts: Prompt[]): Promise<void> {
  const response = await fetch("/api/prompts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prompts),
  });

  if (!response.ok) {
    throw new Error(`Falha ao salvar prompts.json (${response.status})`);
  }
}

function createVersionId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function createVersionSnapshot(
  title: string,
  content: string,
  category: string,
  savedAt = new Date().toISOString()
): PromptVersion {
  return {
    id: createVersionId(),
    title,
    content,
    category,
    savedAt,
  };
}

function normalizeStoredVersions(
  versions: StoredPromptVersion[] | undefined,
  fallbackCategory: string
): PromptVersion[] {
  if (!Array.isArray(versions)) return [];

  return versions
    .map((version) => {
      const title =
        typeof version.title === "string" ? version.title : undefined;
      const content =
        typeof version.content === "string" ? version.content : undefined;

      if (!title || !content) return null;

      const category =
        typeof version.category === "string" && version.category.trim()
          ? version.category
          : fallbackCategory;

      return {
        id:
          typeof version.id === "string" && version.id
            ? version.id
            : createVersionId(),
        title,
        content,
        category,
        savedAt:
          typeof version.savedAt === "string" && version.savedAt
            ? version.savedAt
            : new Date().toISOString(),
      };
    })
    .filter((version): version is PromptVersion => version !== null);
}

function normalizePrompt(prompt: StoredPrompt): Prompt {
  const normalizedCategory = prompt.category?.trim() || "Sem categoria";
  const versions = normalizeStoredVersions(prompt.versions, normalizedCategory);

  const normalizedPrompt: Prompt = {
    id: prompt.id,
    title: prompt.title,
    content: prompt.content,
    category: normalizedCategory,
    versions:
      versions.length > 0
        ? versions
        : [
            createVersionSnapshot(
              prompt.title,
              prompt.content,
              normalizedCategory
            ),
          ],
  };

  const latestVersion = normalizedPrompt.versions.at(-1);
  if (
    latestVersion &&
    (latestVersion.title !== normalizedPrompt.title ||
      latestVersion.content !== normalizedPrompt.content ||
      latestVersion.category !== normalizedPrompt.category)
  ) {
    normalizedPrompt.versions.push(
      createVersionSnapshot(
        normalizedPrompt.title,
        normalizedPrompt.content,
        normalizedPrompt.category
      )
    );
  }

  return normalizedPrompt;
}

export default function App() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selected, setSelected] = useState<Prompt | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isStorageReady, setIsStorageReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPrompts() {
      if (!hasElectronPromptStorage()) {
        try {
          const loadedPrompts = await loadPromptsFromWebApi();
          const normalized = loadedPrompts.map((prompt) =>
            normalizePrompt(prompt)
          );

          if (isMounted) {
            setPrompts(normalized);
            setIsStorageReady(true);
          }
        } catch (error) {
          console.error("Falha ao carregar prompts.json no modo web", error);
          if (isMounted) {
            setPrompts([]);
            setIsStorageReady(true);
          }
        }
        return;
      }

      try {
        const storage = window.promptStorage;
        if (!storage) return;

        const data = await storage.load();
        if (!isMounted) return;

        setPrompts(data.map((prompt) => normalizePrompt(prompt as StoredPrompt)));
        setIsStorageReady(true);
      } catch (error) {
        console.error("Falha ao carregar prompts.json", error);
        if (isMounted) {
          setPrompts([]);
          setIsStorageReady(true);
        }
      }
    }

    void loadPrompts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isStorageReady) return;
    if (!hasElectronPromptStorage()) {
      void savePromptsToWebApi(prompts).catch((error) => {
        console.error("Falha ao salvar prompts.json no modo web", error);
      });
      return;
    }

    const storage = window.promptStorage;
    if (!storage) return;

    void storage.save(prompts).catch((error) => {
      console.error("Falha ao salvar prompts.json", error);
    });
  }, [prompts, isStorageReady]);

  const handleSave = (title: string, content: string, category: string) => {
    if (!title.trim() || !content.trim()) {
      alert("Titulo e conteudo nao podem estar vazios.");
      return;
    }

    const normalizedCategory = category.trim() || "Sem categoria";

    if (selected) {
      const hasChanges =
        selected.title !== title ||
        selected.content !== content ||
        selected.category !== normalizedCategory;

      if (!hasChanges) {
        alert("Nenhuma alteracao para salvar.");
        return;
      }

      const updatedPrompt: Prompt = {
        ...selected,
        title,
        content,
        category: normalizedCategory,
        versions: [
          ...selected.versions,
          createVersionSnapshot(title, content, normalizedCategory),
        ],
      };

      setPrompts((prev: Prompt[]) =>
        prev.map((p: Prompt) => (p.id === selected.id ? updatedPrompt : p))
      );
      setSelected(updatedPrompt);
    } else {
      const newPrompt: Prompt = {
        id: Date.now().toString(36),
        title,
        content,
        category: normalizedCategory,
        versions: [createVersionSnapshot(title, content, normalizedCategory)],
      };
      setPrompts((prev: Prompt[]) => [newPrompt, ...prev]);
      setSelected(newPrompt);
    }

    alert("Prompt salvo com sucesso!");
  };

  const handleRestoreVersion = (versionId: string) => {
    if (!selected) return;

    const version = selected.versions.find((item) => item.id === versionId);
    if (!version) return;

    const isAlreadyCurrent =
      selected.title === version.title &&
      selected.content === version.content &&
      selected.category === version.category;

    if (isAlreadyCurrent) {
      alert("Essa versao ja esta ativa.");
      return;
    }

    const updatedPrompt: Prompt = {
      ...selected,
      title: version.title,
      content: version.content,
      category: version.category,
      versions: [
        ...selected.versions,
        createVersionSnapshot(version.title, version.content, version.category),
      ],
    };

    setPrompts((prev: Prompt[]) =>
      prev.map((p: Prompt) => (p.id === selected.id ? updatedPrompt : p))
    );
    setSelected(updatedPrompt);
    alert("Versao restaurada com sucesso!");
  };

  const handleDelete = (id: string) => {
    setPrompts((prev: Prompt[]) => prev.filter((p: Prompt) => p.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const handleSelect = (id: string) => {
    const prompt = prompts.find((p: Prompt) => p.id === id);
    if (prompt) setSelected(prompt);
  };

  const handleNew = () => setSelected(null);

  const categories = useMemo(
    () =>
      Array.from(new Set(prompts.map((p) => p.category)))
        .filter((categoryItem) => categoryItem.trim() !== "")
        .sort((a, b) => a.localeCompare(b, "pt-BR")),
    [prompts]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const prompt of prompts) {
      counts[prompt.category] = (counts[prompt.category] || 0) + 1;
    }

    return counts;
  }, [prompts]);

  const filteredPrompts = prompts.filter((p: Prompt) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <Sidebar
        isOpen={isSidebarOpen}
        onOpen={() => setIsSidebarOpen(true)}
        onClose={() => setIsSidebarOpen(false)}
        prompts={filteredPrompts}
        categories={categories}
        categoryCounts={categoryCounts}
        totalPrompts={prompts.length}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSearch={setSearch}
        onSelect={handleSelect}
        onDelete={handleDelete}
        onNew={handleNew}
      />
      <PromptEditor
        prompt={selected}
        categories={categories}
        onSave={handleSave}
        onRestoreVersion={handleRestoreVersion}
        onCopy={() => {
          if (selected?.content)
            navigator.clipboard.writeText(selected.content as string);
          alert("Conteudo copiado!");
        }}
      />
    </div>
  );
}
