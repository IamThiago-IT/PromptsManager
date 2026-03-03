import { useRef } from 'react';
import PromptList from "./PromptList";
import { Menu, X, Search, Download, Upload, ArrowUpDown, Save } from 'lucide-react';
import type { Prompt } from '../types/Prompt';
import type { SortMode } from '../App';

interface SidebarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  prompts: Prompt[];
  onSearch: (value: string) => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
  onToggleFavorite: (id: string) => void;
  sortMode: SortMode;
  onSortChange: (mode: SortMode) => void;
  categories: string[];
  filterCategory: string;
  onFilterCategory: (cat: string) => void;
  tags: string[];
  filterTag: string;
  onFilterTag: (tag: string) => void;
  onExport: (format: 'json' | 'markdown') => void;
  onImport: (file: File) => void;
  onBackup: () => void;
}

const sortLabels: Record<SortMode, string> = {
  'date-desc': 'Mais recentes',
  'date-asc': 'Mais antigos',
  'title-asc': 'Título A-Z',
  'title-desc': 'Título Z-A',
  'favorites': 'Favoritos primeiro',
};

export default function Sidebar({
  isOpen,
  onOpen,
  onClose,
  prompts,
  onSearch,
  onSelect,
  onDelete,
  onNew,
  onToggleFavorite,
  sortMode,
  onSortChange,
  categories,
  filterCategory,
  onFilterCategory,
  tags,
  filterTag,
  onFilterTag,
  onExport,
  onImport,
  onBackup,
}: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = '';
    }
  };

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
              placeholder="Buscar por título ou conteúdo"
              onChange={(e) => onSearch(e.target.value)}
            />
            <button className="btn-primary btn btn-full" onClick={onNew}>
              Novo prompt
            </button>
          </div>

          {/* Filters */}
          <div className="sidebar-filters">
            <div className="filter-row">
              <select
                className="filter-select"
                value={sortMode}
                onChange={(e) => onSortChange(e.target.value as SortMode)}
                title="Ordenar"
              >
                {Object.entries(sortLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <ArrowUpDown size={14} className="filter-icon" />
            </div>

            {categories.length > 0 && (
              <select
                className="filter-select"
                value={filterCategory}
                onChange={(e) => onFilterCategory(e.target.value)}
              >
                <option value="">Todas categorias</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}

            {tags.length > 0 && (
              <select
                className="filter-select"
                value={filterTag}
                onChange={(e) => onFilterTag(e.target.value)}
              >
                <option value="">Todas tags</option>
                {tags.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            )}
          </div>

          <PromptList
            prompts={prompts}
            onSelect={onSelect}
            onDelete={onDelete}
            onToggleFavorite={onToggleFavorite}
          />

          {/* Import/Export/Backup */}
          <div className="sidebar-actions">
            <button className="btn btn-outline btn-sm" onClick={() => onExport('json')} title="Exportar JSON">
              <Download size={14} />
              <span>JSON</span>
            </button>
            <button className="btn btn-outline btn-sm" onClick={() => onExport('markdown')} title="Exportar Markdown">
              <Download size={14} />
              <span>MD</span>
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleImportClick} title="Importar">
              <Upload size={14} />
              <span>Importar</span>
            </button>
            <button className="btn btn-outline btn-sm" onClick={onBackup} title="Backup">
              <Save size={14} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
