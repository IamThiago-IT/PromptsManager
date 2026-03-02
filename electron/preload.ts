import { ipcRenderer, contextBridge } from 'electron'

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

// --------- Expose some API to the Renderer process ---------
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

contextBridge.exposeInMainWorld('promptStorage', {
  load: () => ipcRenderer.invoke('prompts:load') as Promise<Prompt[]>,
  save: (prompts: Prompt[]) => ipcRenderer.invoke('prompts:save', prompts) as Promise<void>,
})
