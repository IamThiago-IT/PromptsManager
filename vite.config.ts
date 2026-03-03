import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isWebMode = process.env.MODE === 'web'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()]

  if (!isWebMode) {
    const electron = (await import('vite-plugin-electron/simple')).default
    plugins.push(
      electron({
        main: {
          entry: 'electron/main.ts',
        },
        preload: {
          input: path.join(__dirname, 'electron/preload.ts'),
        },
        renderer:
          process.env.NODE_ENV === 'test'
            ? undefined
            : {},
      })
    )
  }

  return {
    plugins,
    server: isWebMode
      ? { host: '0.0.0.0', port: 5173 }
      : undefined,
  }
})
