# Melhorias Futuras

## Visão Geral

Este documento lista melhorias planejadas para o PromptsManager, organizadas por prioridade e categoria.

---

## Prioridade Alta

### UI/UX - Visual & Animações

#### Cores e Paleta
- Acentuar cores de tags/categorias com paleta vibrante e diversificada
- Adicionar cores distintas para diferentes tipos de tags
- Melhorar contraste em elementos de baixa visibilidade

#### Sombras e Depth
- Adicionar box-shadows suaves para criar profundidade
- Usar sombras sutis em cards e elementos flutuantes
- Melhorar hierarquia visual com sombras diferenciadas

#### Bordas e Arredondamento
- Aumentar border-radius em elementos (botões, inputs, cards)
- Padronizar arredondamento em toda a interface
- Adicionar bordas sutis para definição de áreas

#### Transições e Animações
- Hovers suaves em todos elementos interativos (0.2s-0.3s)
- Animações de entrada/saída em modais e toasts
- Transições em elementos da sidebar (abrir/fechar)

### Feedback Visual

#### Estados de Interação
- Melhorar hover states em todos os botões
- Estados de focus visíveis para acessibilidade
- Estados de disabled com indicativo visual

#### Loading States
- Indicador de carregamento durante operações async
- Spinner ou skeleton em momentos de carregamento

---

## Prioridade Média

### Sidebar Aprimorada

#### Categorias
- Exibir contagem de prompts por categoria
- Badges coloridos para cada categoria
- Ícone distinctivo por tipo de categoria

#### Tags
- Cores variadas para tags (hash de string → cor)
- Tags mais visíveis na lista de prompts
- Autocomplete ao digitar nova tag

#### Lista de Prompts
- Visual de item selecionado mais evidente
- Indicador visual de favorito (estrela preenchida)
- Preview do conteúdo na hover (tooltip)
- Data de última modificação

### Editor Aprimorado

#### Toolbar
- Separadores visuais entre grupos de botões
- Tooltips explicativos
- Atalhos de teclado visuais

#### Status Indicators
- Indicador de modo (editar/preview)
- Status de salvamento mais visível
- Contagem de caracteres/linhas (opcional)

---

## Prioridade Baixa

### Toasts Modernizados

- Ícone distintivo por tipo (sucesso/erro/info)
- Animação slide-in mais fluida
- Barra de progresso para auto-dismiss
- Botão de fechar mais visível

### Dialogs Aprimorados

- Animações mais suaves (fade + scale)
- Foco automático no botão principal
- Escape para fechar
- Backdrop click para fechar

### Botões Aprimorados

- Efeito de click (scale suave)
- Transições de cor mais elaboradas
- Loading spinner integrado

---

## Tech Stack considerations

### Mantendo Leveza

- **Animações**: Usar CSS puro, evitar libs (~30kb economizadas)
- **Ícones**: Lucide já é leve (~20kb), manter
- **Fonts**: System fonts ou fontsubset do Inter
- **Imagens**: SVG inline quando possível

### Evitar

- Framer Motion (30kb)
- Styled Components (20kb+)
- Bibliotecas de ícones maiores
- Frameworks de animação

---

## Ordem de Implementação Sugerida

1. **Fase 1** - Cores, sombras e transições básicas (alto impacto, baixo custo)
2. **Fase 2** - Estados de interação e feedback
3. **Fase 3** - Sidebar e lista de prompts aprimorada
4. **Fase 4** - Editor e toolbar
5. **Fase 5** - Toasts e dialogs
6. **Fase 6** - Polish final e acessibilidade

---

## Notas

- Todas as melhorias devem manter compatibilidade com Electron e Web
- Priorizar CSS puro sobre JavaScript para animações
- Testar performance em dispositivos mais lentos
- Manter bundle size sob controle