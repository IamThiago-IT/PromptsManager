import { Trash, Star } from 'lucide-react';
import type { Prompt } from '../types/Prompt';

interface PromptListProps {
  prompts: Prompt[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function PromptList({ prompts, onSelect, onDelete, onToggleFavorite }: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <div className="prompt-list-empty">
        <p>Nenhum prompt encontrado.</p>
      </div>
    );
  }

  return (
    <ul className="prompt-list">
      {prompts.map((p) => (
        <li
          key={p.id}
          className="prompt-item"
          onClick={() => onSelect(p.id)}
        >
          <div className="prompt-item-content">
            <div className="prompt-item-header">
              <span className="prompt-item-title">{p.title}</span>
              {p.category && (
                <span className="prompt-item-category">{p.category}</span>
              )}
            </div>
            <span className="prompt-item-description">
              {p.content.replace(/<[^>]*>?/gm, "").slice(0, 80)}...
            </span>
            {p.tags.length > 0 && (
              <div className="prompt-item-tags">
                {p.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="prompt-tag">{tag}</span>
                ))}
                {p.tags.length > 3 && (
                  <span className="prompt-tag prompt-tag-more">+{p.tags.length - 3}</span>
                )}
              </div>
            )}
          </div>

          <div className="prompt-item-actions">
            <button
              className="btn-icon"
              title={p.isFavorite ? "Remover favorito" : "Favoritar"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(p.id);
              }}
            >
              <Star
                className={`icon icon-star ${p.isFavorite ? 'icon-star-active' : ''}`}
                size={16}
                fill={p.isFavorite ? 'currentColor' : 'none'}
              />
            </button>
            <button
              className="btn-icon"
              title="Remover"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(p.id);
              }}
            >
              <Trash className="icon icon-trash" size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
