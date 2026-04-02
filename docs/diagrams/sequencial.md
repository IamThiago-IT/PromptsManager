# Diagramas de Sequência

## 1. Fluxo: Criar Novo Prompt

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as App
    participant S as Sidebar
    participant PE as PromptEditor
    participant St as Storage
    
    U->>S: Clica em "Novo Prompt"
    S->>A: onNew()
    A->>PE: setSelected(null)
    PE->>U: Exibe editor vazio
    
    U->>PE: Preenche título e conteúdo
    U->>PE: Clica em "Salvar"
    PE->>A: onSave(title, content, category, tags)
    A->>A: createPrompt()
    A->>A: setPrompts([newPrompt, ...prompts])
    A->>A: setSelected(newPrompt)
    A->>St: savePrompts(prompts)
    St->>St: Persiste dados
    A->>U: Exibe toast "Prompt salvo!"
```

## 2. Fluxo: Editar Prompt

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as App
    participant S as Sidebar
    participant PE as PromptEditor
    participant St as Storage
    
    U->>S: Seleciona prompt
    S->>A: onSelect(id)
    A->>A: setSelected(prompt)
    PE->>U: Exibe prompt no editor
    
    U->>PE: Modifica conteúdo
    U->>PE: Clica em "Salvar" ou auto-save
    PE->>A: onSave() ou onAutoSave()
    A->>A: Atualiza prompt em estado
    A->>A: setSelected(updatedPrompt)
    A->>St: savePrompts(prompts)
    St->>St: Persiste dados
    A->>U: Exibe toast "Prompt salvo!"
```

## 3. Fluxo: Excluir Prompt

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as App
    participant S as Sidebar
    participant CD as ConfirmDialog
    participant St as Storage
    
    U->>S: Clica em excluir prompt
    S->>A: onDelete(id)
    A->>A: setDeleteTarget(id)
    CD->>U: Exibe dialog de confirmação
    
    U->>CD: Confirma exclusão
    CD->>A: onConfirm()
    A->>A: remove prompt de state
    A->>A: setSelected(null) se era o selecionado
    A->>A: setDeleteTarget(null)
    A->>St: savePrompts(prompts)
    St->>St: Persiste dados
    A->>U: Exibe toast "Prompt excluído"
```

## 4. Fluxo: Buscar e Filtrar

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as App
    participant S as Sidebar
    
    U->>S: Digita na busca
    S->>A: onSearch(query)
    A->>A: setSearch(query)
    A->>A: Atualiza filteredPrompts
    A->>U: Atualiza lista visível
    
    U->>S: Seleciona categoria no filtro
    S->>A: onFilterCategory(category)
    A->>A: setFilterCategory(category)
    A->>A: Atualiza filteredPrompts
    A->>U: Atualiza lista visível
```

## 5. Fluxo: Exportar Prompts

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as App
    participant S as Sidebar
    participant St as Storage
    
    U->>S: Clica em "Exportar"
    S->>A: onExport(format)
    A->>St: exportPrompts(prompts, format)
    St->>A: Retorna dados formatados
    
    A->>A: Cria Blob e URL
    A->>A: Cria elemento <a> para download
    A->>U: Dispara download
    A->>U: Exibe toast "Prompts exportados"
```

## 6. Fluxo: Importar Prompts

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as App
    participant S as Sidebar
    participant St as Storage
    
    U->>S: Clica em "Importar"
    S->>U: Abre seletor de arquivo
    U->>S: Seleciona arquivo JSON
    S->>A: onImport(file)
    A->>St: importPrompts(text)
    St->>A: Retorna prompts parseados
    
    A->>A: Faz merge com prompts existentes
    A->>A: Adiciona novos ao state
    A->>St: savePrompts(prompts)
    St->>St: Persiste dados
    A->>U: Exibe toast "N prompts importados"
```

## 7. Fluxo: Backup Automático (Electron)

```mermaid
sequenceDiagram
    participant S as Sistema
    participant A as App
    participant St as Storage
    participant E as Electron Main
    
    S->>E: Evento de mudança em prompts
    E->>A: ipcMain.handle('prompts:backup')
    E->>E: createBackup()
    E->>E: Copia prompts.json para backups/
    E->>E: Remove backups antigos (>10)
    E->>A: Retorna caminho do backup
    A->>U: Exibe toast "Backup realizado"
```

## 8. Fluxo: Copiar Conteúdo

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as App
    participant PE as PromptEditor
    
    U->>PE: Clica em "Copiar"
    PE->>A: onCopy()
    A->>navigator: clipboard.writeText(content)
    navigator-->>A: Confirma cópia
    A->>U: Exibe toast "Conteúdo copiado!"
```