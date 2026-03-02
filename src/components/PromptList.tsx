import { Trash } from "lucide-react";

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

export default function PromptList({
  prompts,
  onSelect,
  onDelete,
}: {
  prompts: Prompt[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <ul className="prompt-list">
      {prompts.map((p) => (
        <li key={p.id} className="prompt-item" onClick={() => onSelect(p.id)}>
          <div className="prompt-item-content">
            <div className="prompt-item-header">
              <span className="prompt-item-title">{p.title}</span>
              <div className="prompt-meta-pills">
                <span className="prompt-category-pill">{p.category}</span>
                <span className="prompt-version-pill">{p.versions.length}v</span>
              </div>
            </div>

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
