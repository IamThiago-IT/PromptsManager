import { useEffect, useState } from "react";
import { Copy } from 'lucide-react';

export default function PromptEditor({ prompt, onSave, onCopy }: { prompt: any, onSave: (title: string, content: string) => void, onCopy: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(prompt?.title || "");
    setContent(prompt?.content || "");
  }, [prompt]);

  return (
    <main className="main">
      <header className="main-header">
        <button className="btn-outline btn" onClick={onCopy}>
          <Copy className="icon" />
          <span>Copiar</span>
        </button>

        <button className="btn-primary btn w-150" onClick={() => onSave(title, content)}>
          Salvar
        </button>
      </header>

      <div data-placeholder="Título do prompt" className={`editable-wrapper ${!title ? "is-empty" : ""}`}>
        <h1
          className="prompt-title"
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setTitle(e.currentTarget.textContent || "")}
        >
          {title}
        </h1>
      </div>

      <div data-placeholder="Conteúdo do prompt ..." className={`editable-wrapper ${!content ? "is-empty" : ""}`}>
        <div
          className="prompt-content"
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </main>
  );
}
