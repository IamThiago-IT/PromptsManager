import { Trash } from 'lucide-react';

export default function PromptList({ prompts, onSelect, onDelete }: { prompts: any[], onSelect: (id: string) => void, onDelete: (id: string) => void }) {
  return (
    <ul className="prompt-list">
      {prompts.map((p) => (
        <li
          key={p.id}
          className="prompt-item"
          onClick={() => onSelect(p.id)}
        >
          <div className="prompt-item-content">
            <span className="prompt-item-title">{p.title}</span>
            <span className="prompt-item-description">
              {p.content.replace(/<[^>]*>?/gm, "").slice(0, 50)}...
            </span>
          </div>

          <button
            className="btn-icon"
            title="Remover"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(p.id);
            }}
          >
            <Trash className="icon icon-trash" />
          </button>
        </li>
      ))}
    </ul>
  );
}
