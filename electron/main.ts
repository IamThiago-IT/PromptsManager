import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { promises as fs } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

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

function isPromptVersionArray(value: unknown): value is PromptVersion[] {
  return Array.isArray(value) && value.every((item) => {
    if (typeof item !== 'object' || item === null) {
      return false
    }

    const version = item as Record<string, unknown>
    return (
      typeof version.id === 'string' &&
      typeof version.title === 'string' &&
      typeof version.content === 'string' &&
      (version.category === undefined || typeof version.category === 'string') &&
      (version.savedAt === undefined || typeof version.savedAt === 'string')
    )
  })
}

function getPromptsFilePath(): string {
  if (app.isPackaged) {
    return path.join(path.dirname(app.getPath('exe')), 'prompts.json')
  }

  return path.join(process.env.APP_ROOT, 'prompts.json')
}

function isPromptArray(value: unknown): value is Prompt[] {
  return Array.isArray(value) && value.every((item) => {
    if (typeof item !== 'object' || item === null) {
      return false
    }

    const prompt = item as Record<string, unknown>
    return (
      typeof prompt.id === 'string' &&
      typeof prompt.title === 'string' &&
      typeof prompt.content === 'string' &&
      (prompt.category === undefined || typeof prompt.category === 'string') &&
      (prompt.versions === undefined || isPromptVersionArray(prompt.versions))
    )
  })
}

async function loadPrompts(): Promise<Prompt[]> {
  const promptsFilePath = getPromptsFilePath()

  try {
    const fileContent = await fs.readFile(promptsFilePath, 'utf-8')
    const parsedContent: unknown = JSON.parse(fileContent)
    return isPromptArray(parsedContent) ? parsedContent : []
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException
    if (fileError.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function savePrompts(prompts: Prompt[]): Promise<void> {
  const promptsFilePath = getPromptsFilePath()
  await fs.mkdir(path.dirname(promptsFilePath), { recursive: true })
  await fs.writeFile(promptsFilePath, JSON.stringify(prompts, null, 2), 'utf-8')
}

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  ipcMain.handle('prompts:load', () => loadPrompts())
  ipcMain.handle('prompts:save', (_event, prompts: unknown) => {
    if (!isPromptArray(prompts)) {
      throw new Error('Invalid prompt payload')
    }

    return savePrompts(prompts)
  })

  createWindow()
})
