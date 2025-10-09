import PromptList from "./PromptList";
import { Menu, X, Search, Plus } from 'lucide-react';

export default function Sidebar({
  isOpen,
  onOpen,
  onClose,
  prompts,
  onSearch,
  onSelect,
  onDelete,
  onNew,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  prompts: any[];
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
              placeholder="Buscar por título"
              onChange={(e) => onSearch(e.target.value)}
            />
            <button className="btn-primary btn btn-full" onClick={onNew}>
              Novo prompt
            </button>
          </div>

          <PromptList prompts={prompts} onSelect={onSelect} onDelete={onDelete} />
        </div>
      </aside>
    </>
  );
}
