import { useEffect, useState, useRef, useCallback } from "react";
import { Copy, Eye, Edit3, Undo2, Redo2, Tag, X } from 'lucide-react';
import type { Prompt } from '../types/Prompt';
import MarkdownPreview from './MarkdownPreview';

interface PromptEditorProps {
  prompt: Prompt | null;
  onSave: (title: string, content: string, category: string, tags: string[]) => void;
  onCopy: () => void;
  categories: string[];
}

// Simple undo/redo hook
function useHistory(initial: string) {
  const [history, setHistory] = useState<string[]>([initial]);
  const [index, setIndex] = useState(0);

  const current = history[index] ?? initial;

  const push = useCallback((value: string) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, index + 1);
      newHistory.push(value);
      // Keep max 100 entries
      if (newHistory.length > 100) newHistory.shift();
      return newHistory;
    });
    setIndex((prev) => Math.min(prev + 1, 99));
  }, [index]);

  const undo = useCallback(() => {
    setIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const redo = useCallback(() => {
    setIndex((prev) => Math.min(history.length - 1, prev + 1));
  }, [history.length]);

  const reset = useCallback((value: string) => {
    setHistory([value]);
    setIndex(0);
  }, []);

  const canUndo = index > 0;
  const canRedo = index < history.length - 1;

  return { current, push, undo, redo, reset, canUndo, canRedo };
}

// Replace template variables like {{name}} with highlighted spans
function highlightTemplateVars(text: string): string {
  return text.replace(
    /\{\{(\w+)\}\}/g,
    '**`{{$1}}`**'
  );
}

export default function PromptEditor({ prompt, onSave, onCopy, categories }: PromptEditorProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const contentHistory = useHistory("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setTitle(prompt?.title || "");
    setCategory(prompt?.category || "");
    setTags(prompt?.tags || []);
    contentHistory.reset(prompt?.content || "");
    setIsPreview(false);
    setNewCategory("");
    setTagInput("");
  }, [prompt?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleContentChange = (value: string) => {
    // Debounced push to history
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      contentHistory.push(value);
    }, 500);
  };

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const effectiveCategory = newCategory.trim() || category;

  const handleSave = () => {
    onSave(title, contentHistory.current, effectiveCategory, tags);
    if (newCategory.trim()) {
      setCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        contentHistory.undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
        e.preventDefault();
        contentHistory.redo();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const previewContent = highlightTemplateVars(contentHistory.current);

  return (
    <main className="main">
      <header className="main-header">
        <div className="editor-toolbar">
          <button
            className={`btn-icon toolbar-btn ${!isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(false)}
            title="Editar"
          >
            <Edit3 size={16} />
          </button>
          <button
            className={`btn-icon toolbar-btn ${isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(true)}
            title="Preview Markdown"
          >
            <Eye size={16} />
          </button>
          <div className="toolbar-separator" />
          <button
            className="btn-icon toolbar-btn"
            onClick={contentHistory.undo}
            disabled={!contentHistory.canUndo}
            title="Desfazer (Ctrl+Z)"
          >
            <Undo2 size={16} />
          </button>
          <button
            className="btn-icon toolbar-btn"
            onClick={contentHistory.redo}
            disabled={!contentHistory.canRedo}
            title="Refazer (Ctrl+Y)"
          >
            <Redo2 size={16} />
          </button>
        </div>

        <div className="header-actions">
          <button className="btn-outline btn" onClick={onCopy}>
            <Copy className="icon" />
            <span>Copiar</span>
          </button>

          <button className="btn-primary btn w-150" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </header>

      {/* Title */}
      <input
        type="text"
        className="prompt-title-input"
        placeholder="Título do prompt"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Category & Tags */}
      <div className="editor-meta">
        <div className="meta-row">
          <label className="meta-label">Categoria:</label>
          <select
            className="filter-select meta-select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setNewCategory("");
            }}
          >
            <option value="">Sem categoria</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="text"
            className="meta-input"
            placeholder="ou nova categoria"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>

        <div className="meta-row">
          <label className="meta-label">
            <Tag size={14} /> Tags:
          </label>
          <div className="tags-input-container">
            {tags.map((tag) => (
              <span key={tag} className="prompt-tag prompt-tag-removable">
                {tag}
                <button className="tag-remove" onClick={() => handleRemoveTag(tag)}>
                  <X size={10} />
                </button>
              </span>
            ))}
            <input
              type="text"
              className="tag-input"
              placeholder="Adicionar tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={handleAddTag}
            />
          </div>
        </div>
      </div>

      {/* Content - Edit or Preview */}
      {isPreview ? (
        <div className="prompt-content-preview">
          <MarkdownPreview content={previewContent} />
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          className="prompt-content-textarea"
          placeholder="Conteúdo do prompt...&#10;&#10;Use Markdown para formatação.&#10;Use {{variavel}} para placeholders de template."
          value={contentHistory.current}
          onChange={(e) => {
            handleContentChange(e.target.value);
            // Immediate visual update via direct state manipulation
            contentHistory.push(e.target.value);
          }}
        />
      )}
    </main>
  );
}
