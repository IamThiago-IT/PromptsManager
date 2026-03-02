import PromptList from "./PromptList";
import { Menu, X, Search } from "lucide-react";

type Prompt = {
  id: string;
  title: string;
  content: string;
  category: string;
  versions: {
    id: string;
    title: string;
    content: string;
    category: string;
    savedAt: string;
  }[];
};

export default function Sidebar({
  isOpen,
  onOpen,
  onClose,
  prompts,
  categories,
  categoryCounts,
  totalPrompts,
  selectedCategory,
  onCategoryChange,
  onSearch,
  onSelect,
  onDelete,
  onNew,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  prompts: Prompt[];
  categories: string[];
  categoryCounts: Record<string, number>;
  totalPrompts: number;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onSearch: (value: string) => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <>
      <button className="icon-button open-toggle" onClick={onOpen}>
        <Menu className="icon" />
      </button>

      <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <header className="sidebar-header">
          <h1 className="logo">Prompt</h1>
          <button className="icon-button" onClick={onClose}>
            <X className="icon" />
          </button>
        </header>

        <div className="sidebar-content">
          <div className="search-container">
            <Search className="icon search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por titulo"
              onChange={(e) => onSearch(e.target.value)}
            />

            <select
              className="category-select"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="Todas">Todas as categorias ({totalPrompts})</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category} ({categoryCounts[category] || 0})
                </option>
              ))}
            </select>

            <button className="btn-primary btn btn-full" onClick={onNew}>
              Novo prompt
            </button>
          </div>

          <PromptList
            prompts={prompts}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        </div>
      </aside>
    </>
  );
}
