# 🚀 PromptsManager

Gerencie seus prompts como ativos, não como textos soltos.

O **PromptsManager** é uma aplicação para organizar, categorizar e reutilizar prompts usados com IA.
Se você trabalha com ChatGPT, Copilot ou qualquer modelo generativo, sabe que bons prompts se acumulam — e se perdem.

Esse projeto resolve isso.

---

## 🧠 O Problema

Quem usa IA profissionalmente:

* Espalha prompts em Notion, bloco de notas, README e histórico de chat
* Perde tempo recriando prompts que já funcionavam
* Não tem controle de versões
* Não consegue estruturar conhecimento acumulado

Prompt bom não deveria depender de memória.

---

## 🎯 A Solução

O PromptsManager centraliza seus prompts em um único lugar, permitindo:

* 📂 Criar e salvar prompts
* 🏷️ Organizar por categorias e tags
* 🔎 Buscar rapidamente
* ♻️ Reutilizar facilmente
* 🧩 Estruturar sua estratégia de IA

A ideia é simples: tratar prompts como código reutilizável.

---

## 🏗️ Estrutura do Projeto

```
/src
  /components      # Sidebar, PromptEditor, PromptList, MarkdownPreview, etc.
  /services        # storage.ts (localStorage + Electron IPC)
  /hooks           # useToast.ts
  /types           # Prompt.ts
  App.tsx          # Componente principal
```

---

## ✨ Funcionalidades

- **CRUD completo** - Criar, editar e excluir prompts
- **Categorias e Tags** - Organize seus prompts com múltiplas tags
- **Favoritos** - Marque seus prompts preferidos
- **Busca e Filtros** - Filtre por categoria, tag ou texto
- **Ordenação** - Por data (recente/antigo), título (A-Z/Z-A) ou favoritos
- **Auto-save** - Salvamento automático após 2 segundos de inatividade
- **Undo/Redo** - Histórico de edições no editor (Ctrl+Z / Ctrl+Y)
- **Preview Markdown** - Visualize o conteúdo formatado
- **Variáveis de Template** - Suporte a `{{variavel}}` com highlight
- **Importar/Exportar** - JSON e Markdown
- **Backup** - Exporte todos os dados
- **Interface responsiva** - Funciona em desktop e web
- **Modo Desktop** - Versão Electron para desktop

---

## 🚀 Instalação

Clone o repositório:

```bash
git clone https://github.com/IamThiago-IT/PromptsManager.git
```

Entre na pasta do projeto:

```bash
cd PromptsManager
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

### Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Iniciar desenvolvimento |
| `npm run dev:web` | Modo web only |
| `npm run dev:desktop` | Modo desktop (Electron) |
| `npm run build:web` | Build para web |
| `npm run build:desktop` | Build desktop (Electron) |
| `npm run lint` | Verificar código |

---

## 📌 Roadmap

- [x] Sistema de categorias
- [x] Sistema de tags
- [x] Busca e filtros
- [x] Ordenação (data, título, favoritos)
- [x] Exportação e importação (JSON/Markdown)
- [x] Auto-save
- [ ] Versionamento de prompts
- [ ] Backup automático na nuvem
- [ ] Compartilhamento público
- [ ] Integração com APIs de IA

---

## 🧩 Casos de Uso

* Desenvolvedor organizando prompts técnicos
* Criador salvando templates de conteúdo
* Estudante estruturando prompts educacionais
* Profissional automatizando tarefas com IA

---

## 🤝 Contribuição

Se quiser melhorar:

1. Fork o projeto
2. Crie uma branch (`feature/nome-da-feature`)
3. Commit suas alterações
4. Abra um Pull Request

Issues são bem-vindas.

---

## 📄 Licença

MIT License

---

## 🔥 Por que isso importa?

IA é multiplicador de produtividade.
Mas produtividade sem organização vira retrabalho.

Se você usa IA todo dia e ainda salva prompt em bloco de notas, está operando abaixo do seu potencial.

Prompts são ativos.
Gerencie como tal.