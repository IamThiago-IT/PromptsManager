# Diagrama de Casos de Uso

```mermaid
graph TD
    actor Usuario
    
    subgraph Gerenciamento
        UC1[Criar Prompt]
        UC2[Editar Prompt]
        UC3[Excluir Prompt]
        UC4[Visualizar Prompt]
    end
    
    subgraph Organizacao
        UC5[Buscar Prompts]
        UC6[Filtrar por Categoria]
        UC7[Filtrar por Tag]
        UC8[Ordenar Lista]
        UC9[Marcar Favorito]
    end
    
    subgraph Dados
        UC10[Exportar Prompts]
        UC11[Importar Prompts]
        UC12[Fazer Backup]
    end
    
    subgraph Utilitarios
        UC13[Copiar Conteúdo]
        UC14[Visualizar Preview]
    end
    
    Usuario --> UC1
    Usuario --> UC2
    Usuario --> UC3
    Usuario --> UC4
    Usuario --> UC5
    Usuario --> UC6
    Usuario --> UC7
    Usuario --> UC8
    Usuario --> UC9
    Usuario --> UC10
    Usuario --> UC11
    Usuario --> UC12
    Usuario --> UC13
    Usuario --> UC14
```

## Descrição dos Casos de Uso

| Caso | Descrição |
|------|-----------|
| **Criar Prompt** | Usuário cria novo prompt com título, conteúdo, categoria e tags |
| **Editar Prompt** | Usuário modifica prompt existente |
| **Excluir Prompt** | Usuário remove prompt com confirmação |
| **Visualizar Prompt** | Usuário visualiza prompt no editor |
| **Buscar Prompts** | Usuário pesquisa por título ou conteúdo |
| **Filtrar por Categoria** | Usuário filtra prompts por categoria |
| **Filtrar por Tag** | Usuário filtra prompts por tag |
| **Ordenar Lista** | Usuário ordena por data, título ou favoritos |
| **Marcar Favorito** | Usuário marca/desmarca prompt como favorito |
| **Exportar Prompts** | Usuário exporta para JSON ou Markdown |
| **Importar Prompts** | Usuário importa prompts de arquivo JSON |
| **Fazer Backup** | Sistema cria backup automático |
| **Copiar Conteúdo** | Usuário copia conteúdo do prompt para clipboard |
| **Visualizar Preview** | Usuário visualiza conteúdo em Markdown |