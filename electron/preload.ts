import { ipcRenderer, contextBridge } from 'electron'

// Expose typed API to the Renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  loadPrompts: () => ipcRenderer.invoke('prompts:load'),
  savePrompts: (prompts: any[]) => ipcRenderer.invoke('prompts:save', prompts),
  createBackup: () => ipcRenderer.invoke('prompts:backup'),
  exportPrompts: (prompts: any[], format: string) =>
    ipcRenderer.invoke('prompts:export', prompts, format),
})

// Keep backward compat for ipcRenderer (can be removed later)
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
})
