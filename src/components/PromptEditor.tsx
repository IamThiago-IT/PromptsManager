import { useEffect, useMemo, useRef, useState } from "react";
import { Copy } from "lucide-react";

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

function formatVersionDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString("pt-BR");
}

export default function PromptEditor({
  prompt,
  categories,
  onSave,
  onRestoreVersion,
  onCopy,
}: {
  prompt: Prompt | null;
  categories: string[];
  onSave: (title: string, content: string, category: string) => void;
  onRestoreVersion: (versionId: string) => void;
  onCopy: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Sem categoria");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const versions = useMemo(
    () => (prompt?.versions ? [...prompt.versions].reverse() : []),
    [prompt]
  );

  useEffect(() => {
    const nextTitle = prompt?.title || "";
    const nextContent = prompt?.content || "";
    const nextCategory = prompt?.category || "Sem categoria";

    setTitle(nextTitle);
    setContent(nextContent);
    setCategory(nextCategory);

    if (titleRef.current && titleRef.current.textContent !== nextTitle) {
      titleRef.current.textContent = nextTitle;
    }

    if (contentRef.current && contentRef.current.innerHTML !== nextContent) {
      contentRef.current.innerHTML = nextContent;
    }
  }, [prompt]);

  return (
    <main className="main">
      <header className="main-header">
        <button className="btn-outline btn" onClick={onCopy}>
          <Copy className="icon" />
          <span>Copiar</span>
        </button>

        <button
          className="btn-primary btn w-150"
          onClick={() => onSave(title, content, category)}
        >
          Salvar
        </button>
      </header>

      <div className="editor-meta">
        <label className="category-label" htmlFor="prompt-category">
          Categoria
        </label>
        <input
          id="prompt-category"
          className="category-input"
          type="text"
          value={category}
          list="prompt-categories"
          placeholder="Ex: Marketing"
          onChange={(e) => setCategory(e.target.value)}
        />
        <datalist id="prompt-categories">
          {categories.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </div>

      <div className="version-panel">
        <div className="version-panel-header">
          <span>Versoes ({prompt?.versions.length || 0})</span>
        </div>

        {!prompt && (
          <p className="version-empty">
            Salve o prompt para comecar o historico de versoes.
          </p>
        )}

        {prompt && versions.length > 0 && (
          <ul className="version-list">
            {versions.map((version, index) => (
              <li key={version.id} className="version-item">
                <div className="version-item-meta">
                  <strong>v{versions.length - index}</strong>
                  <span>{formatVersionDate(version.savedAt)}</span>
                  <small>{version.category}</small>
                </div>
                <button
                  type="button"
                  className="version-restore-btn"
                  onClick={() => onRestoreVersion(version.id)}
                >
                  Restaurar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        data-placeholder="Titulo do prompt"
        className={`editable-wrapper ${!title ? "is-empty" : ""}`}
      >
        <h1
          ref={titleRef}
          className="prompt-title"
          contentEditable
          dir="ltr"
          suppressContentEditableWarning
          onInput={(e) => setTitle(e.currentTarget.textContent || "")}
        />
      </div>

      <div
        data-placeholder="Conteudo do prompt ..."
        className={`editable-wrapper ${!content ? "is-empty" : ""}`}
      >
        <div
          ref={contentRef}
          className="prompt-content"
          contentEditable
          dir="ltr"
          suppressContentEditableWarning
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
        />
      </div>
    </main>
  );
}
