/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

type Prompt = {
  id: string
  title: string
  content: string
  category?: string
  versions?: PromptVersion[]
}

type PromptVersion = {
  id: string
  title: string
  content: string
  category?: string
  savedAt?: string
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer?: import('electron').IpcRenderer
  promptStorage?: {
    load: () => Promise<Prompt[]>
    save: (prompts: Prompt[]) => Promise<void>
  }
}
