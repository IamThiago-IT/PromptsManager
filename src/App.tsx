import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import PromptEditor from "./components/PromptEditor";
import "./index.css";

const STORAGE_KEY = "prompts_storage";

export default function App() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Carrega prompts do localStorage
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setPrompts(JSON.parse(data));
  }, []);

  // Salva sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  }, [prompts]);

  const handleSave = (title: string, content: string) => {
    if (!title.trim() || !content.trim()) {
      alert("Título e conteúdo não podem estar vazios.");
      return;
    }

    if (selected) {
      setPrompts((prev: any) =>
        prev.map((p: any) =>
          p.id === selected.id ? { ...p, title, content } : p
        )
      );
    } else {
      const newPrompt = {
        id: Date.now().toString(36),
        title,
        content,
      };
      setPrompts((prev: any[]) => [newPrompt, ...prev]);
      setSelected(newPrompt);
    }

    alert("Prompt salvo com sucesso!");
  };

  const handleDelete = (id: string) => {
    setPrompts((prev: any) => prev.filter((p: any) => p.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const handleSelect = (id: string) => {
    const prompt = prompts.find((p: any) => p.id === id);
    if (prompt) setSelected(prompt);
  };

  const handleNew = () => setSelected(null);

  const filteredPrompts = prompts.filter((p: any) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Sidebar
        isOpen={isSidebarOpen}
        onOpen={() => setIsSidebarOpen(true)}
        onClose={() => setIsSidebarOpen(false)}
        prompts={filteredPrompts}
        onSearch={setSearch}
        onSelect={handleSelect}
        onDelete={handleDelete}
        onNew={handleNew}
      />
      <PromptEditor
        prompt={selected}
        onSave={handleSave}
        onCopy={() => {
          if (selected?.content)
            navigator.clipboard.writeText(selected.content as string);
          alert("Conteúdo copiado!");
        }}
      />
    </div>
  );
}
