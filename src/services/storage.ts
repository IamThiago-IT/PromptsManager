import type { Prompt } from '../types/Prompt';

const STORAGE_KEY = 'prompts_storage';

interface ElectronAPI {
  loadPrompts: () => Promise<Prompt[]>;
  savePrompts: (prompts: Prompt[]) => Promise<void>;
  createBackup: () => Promise<string>;
  exportPrompts: (prompts: Prompt[], format: string) => Promise<string>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

/**
 * Detects if running inside Electron with IPC available.
 */
function isElectron(): boolean {
  return !!window.electronAPI;
}

/**
 * Storage service that uses Electron IPC when available,
 * falling back to localStorage for web mode.
 */
export const storage = {
  async loadPrompts(): Promise<Prompt[]> {
    if (isElectron()) {
      return window.electronAPI!.loadPrompts();
    }
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data) as Prompt[];
    } catch {
      return [];
    }
  },

  async savePrompts(prompts: Prompt[]): Promise<void> {
    if (isElectron()) {
      return window.electronAPI!.savePrompts(prompts);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  },

  async exportPrompts(prompts: Prompt[], format: 'json' | 'markdown'): Promise<string> {
    if (format === 'json') {
      return JSON.stringify(prompts, null, 2);
    }
    return prompts
      .map(
        (p) =>
          `# ${p.title}\n\n` +
          `**Categoria:** ${p.category || 'Sem categoria'}  \n` +
          `**Tags:** ${p.tags.length ? p.tags.join(', ') : 'Nenhuma'}  \n` +
          `**Favorito:** ${p.isFavorite ? 'Sim' : 'Não'}  \n` +
          `**Criado:** ${new Date(p.createdAt).toLocaleString()}  \n` +
          `**Atualizado:** ${new Date(p.updatedAt).toLocaleString()}  \n\n` +
          `---\n\n${p.content}\n`
      )
      .join('\n---\n\n');
  },

  async importPrompts(data: string): Promise<Prompt[]> {
    try {
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) throw new Error('Invalid format');
      return parsed as Prompt[];
    } catch {
      throw new Error('Arquivo inválido. Use um JSON exportado pelo PromptsManager.');
    }
  },
};
