# Diagrama de Classes

```mermaid
classDiagram
    class Prompt {
        +string id
        +string title
        +string content
        +string category
        +string[] tags
        +boolean isFavorite
        +number createdAt
        +number updatedAt
        +number order
    }
    
    class App {
        +Prompt[] prompts
        +Prompt selected
        +string search
        +boolean isSidebarOpen
        +SortMode sortMode
        +string filterCategory
        +string filterTag
        +string deleteTarget
        +boolean isLoaded
        +handleSave()
        +handleAutoSave()
        +handleDeleteRequest()
        +handleDeleteConfirm()
        +handleSelect()
        +handleNew()
        +handleToggleFavorite()
        +handleCopy()
        +handleExport()
        +handleImport()
        +handleBackup()
    }
    
    class Sidebar {
        +boolean isOpen
        +Prompt[] prompts
        +string search
        +SortMode sortMode
        +string filterCategory
        +string filterTag
        +string[] categories
        +string[] tags
        +onOpen()
        +onClose()
        +onSearch()
        +onSelect()
        +onDelete()
        +onNew()
        +onToggleFavorite()
        +onSortChange()
        +onFilterCategory()
        +onFilterTag()
        +onExport()
        +onImport()
        +onBackup()
    }
    
    class PromptEditor {
        +Prompt prompt
        +string[] categories
        +onSave()
        +onAutoSave()
        +onCopy()
    }
    
    class PromptList {
        +Prompt[] prompts
        +string selectedId
        +onSelect()
        +onDelete()
        +onToggleFavorite()
    }
    
    class ToastContainer {
        +Toast[] toasts
        +onRemove()
    }
    
    class ConfirmDialog {
        +boolean open
        +string title
        +string message
        +onConfirm()
        +onCancel()
    }
    
    class Toast {
        +string id
        +string message
        +ToastType type
    }
    
    class Storage {
        +loadPrompts()
        +savePrompts()
        +exportPrompts()
        +importPrompts()
    }
    
    class useToast {
        +toasts: Toast[]
        +addToast()
        +removeToast()
    }
    
    App --> Prompt
    App --> Sidebar
    App --> PromptEditor
    App --> ToastContainer
    App --> ConfirmDialog
    App --> Storage
    App --> useToast
    
    Sidebar --> PromptList
    Sidebar --> Prompt
    
    PromptEditor --> Toast
    
    ToastContainer --> Toast
    
    useToast --> Toast
    
    Storage --> Prompt
    
    PromptEditor --|> MarkdownPreview
    
    PromptList --> Prompt
```

## Descrição das Classes

| Classe | Responsabilidade |
|--------|-----------------|
| **Prompt** | Modelo de dados que representa um prompt individual |
| **App** | Componente principal que gerencia estado e coordena funcionalidades |
| **Sidebar** | Gerencia lista de prompts, busca, filtros e ordenação |
| **PromptEditor** | Editor de conteúdo do prompt com campos de título, conteúdo, categoria e tags |
| **PromptList** | Exibe lista de prompts na sidebar |
| **ToastContainer** | Exibe notificações temporárias (sucesso, erro, info) |
| **ConfirmDialog** | Dialog de confirmação para ações destrutivas |
| **Toast** | Modelo de dados para notificações |
| **Storage** | Abstração de persistência (Electron IPC ou localStorage) |
| **useToast** | Hook React para gerenciar toasts |

## Relacionamentos

- **App** é o componente raiz que coordena todos os demais
- **Sidebar** lista e filtra prompts, comunica seleção ao App
- **PromptEditor** permite edição e cria/modifica prompts
- **Storage** abstrai a persistência de dados
- **useToast** fornece sistema de notificações para feedback ao usuário