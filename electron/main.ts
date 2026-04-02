import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

// --- Persistence helpers ---
function getPromptsFilePath(): string {
  return path.join(app.getPath('userData'), 'prompts.json')
}

function getBackupDir(): string {
  return path.join(app.getPath('userData'), 'backups')
}

function loadPromptsFromDisk(): any[] {
  const filePath = getPromptsFilePath()
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (err) {
    console.error('Error loading prompts:', err)
  }
  return []
}

function savePromptsToDisk(prompts: any[]): void {
  const filePath = getPromptsFilePath()
  fs.writeFileSync(filePath, JSON.stringify(prompts, null, 2), 'utf-8')
}

function createBackup(): string {
  const backupDir = getBackupDir()
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }
  const filePath = getPromptsFilePath()
  if (!fs.existsSync(filePath)) return ''

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupPath = path.join(backupDir, `prompts-backup-${timestamp}.json`)
  fs.copyFileSync(filePath, backupPath)

  // Keep only the last 10 backups
  const backups = fs.readdirSync(backupDir)
    .filter(f => f.startsWith('prompts-backup-'))
    .sort()
  while (backups.length > 10) {
    const oldest = backups.shift()!
    fs.unlinkSync(path.join(backupDir, oldest))
  }

  return backupPath
}

// --- IPC Handlers ---
function registerIpcHandlers() {
  ipcMain.handle('prompts:load', () => {
    return loadPromptsFromDisk()
  })

  ipcMain.handle('prompts:save', (_event, prompts: any[]) => {
    savePromptsToDisk(prompts)
  })

  ipcMain.handle('prompts:backup', () => {
    return createBackup()
  })

  ipcMain.handle('prompts:export', (_event, prompts: any[], format: string) => {
    if (format === 'json') {
      return JSON.stringify(prompts, null, 2)
    }
    // Markdown format
    return prompts
      .map(
        (p: any) =>
          `# ${p.title}\n\n` +
          `**Categoria:** ${p.category || 'Sem categoria'}  \n` +
          `**Tags:** ${p.tags?.length ? p.tags.join(', ') : 'Nenhuma'}  \n` +
          `**Favorito:** ${p.isFavorite ? 'Sim' : 'Não'}  \n\n` +
          `---\n\n${p.content}\n`
      )
      .join('\n---\n\n')
  })
}

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
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
  registerIpcHandlers()
  createWindow()
})
