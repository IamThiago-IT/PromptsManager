# 🚀 PromptsManager

Gestiona tus prompts como activos, no como texto disperso.

**PromptsManager** es una aplicación para organizar, categorizar y reutilizar prompts utilizados con IA.
Si trabajas con ChatGPT, Copilot o cualquier modelo generativo, sabes que los buenos prompts se acumulan — y se pierden.

Este proyecto lo soluciona.

---

## 🧠 El Problema

Los usuarios profesionales de IA:

* Esparcen prompts en Notion, bloc de notas, README e historial de chat
* Pierden tiempo recreando prompts que ya funcionaban
* No tienen control de versiones
* No pueden estructurar el conocimiento acumulado

Los buenos prompts no deberían depender de la memoria.

---

## 🎯 La Solución

PromptsManager centraliza tus prompts en un solo lugar, permitiendo:

* 📂 Crear y guardar prompts
* 🏷️ Organizar por categorías y etiquetas
* 🔎 Buscar rápidamente
* ♻️ Reutilizar fácilmente
* 🧩 Estructurar tu estrategia de IA

La idea es simple: tratar los prompts como código reutilizable.

---

## 🏗️ Estructura del Proyecto

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

- **CRUD completo** - Crear, editar y eliminar prompts
- **Categorías y Etiquetas** - Organiza tus prompts con múltiples etiquetas
- **Favoritos** - Marca tus prompts preferidos
- **Búsqueda y Filtros** - Filtra por categoría, etiqueta o texto
- **Ordenación** - Por fecha (reciente/antiguo), título (A-Z/Z-A) o favoritos
- **Auto-guardado** - Guardado automático después de 2 segundos de inactividad
- **Deshacer/Rehacer** - Historial de ediciones en el editor (Ctrl+Z / Ctrl+Y)
- **Vista previa Markdown** - Ver contenido formateado
- **Variables de Plantilla** - Soporte para `{{variable}}` con resaltado
- **Importar/Exportar** - JSON y Markdown
- **Backup** - Exportar todos los datos
- **Interfaz responsiva** - Funciona en escritorio y web
- **Modo Escritorio** - Versión Electron para escritorio

---

## 🚀 Instalación

Clona el repositorio:

```bash
git clone https://github.com/IamThiago-IT/PromptsManager.git
```

Entra a la carpeta del proyecto:

```bash
cd PromptsManager
```

Instala las dependencias:

```bash
npm install
```

Ejecuta el proyecto:

```bash
npm run dev
```

### Scripts Disponibles

| Script | Descripción |
|--------|-----------|
| `npm run dev` | Iniciar desarrollo |
| `npm run dev:web` | Modo web only |
| `npm run dev:desktop` | Modo escritorio (Electron) |
| `npm run build:web` | Build para web |
| `npm run build:desktop` | Build escritorio (Electron) |
| `npm run lint` | Verificar código |

---

## 📌 Roadmap

- [x] Sistema de categorías
- [x] Sistema de etiquetas
- [x] Búsqueda y filtros
- [x] Ordenación (fecha, título, favoritos)
- [x] Exportación e importación (JSON/Markdown)
- [x] Auto-guardado
- [ ] Versionado de prompts
- [ ] Backup automático en la nube
- [ ] Compartir públicamente
- [ ] Integración con APIs de IA

---

## 🧩 Casos de Uso

* Desarrollador organizando prompts técnicos
* Creador guardando plantillas de contenido
* Estudiante estructurando prompts educativos
* Profesional automatizando tareas con IA

---

## 🤝 Contribución

Para mejorar:

1. Haz fork del proyecto
2. Crea una rama (`feature/nombre-de-feature`)
3. Commitea tus cambios
4. Abre un Pull Request

Los issues son bienvenidos.

---

## 📄 Licencia

MIT License

---

## 🔥 Por qué importa esto?

IA es un multiplicador de productividad.
Pero productividad sin organización se convierte en retrabajo.

Si usas IA todos los días y aún guardas prompts en bloc de notas, estás operando por debajo de tu potencial.

Los prompts son activos.
Gestiónalos como tales.