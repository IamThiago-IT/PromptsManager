import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { promises } from "node:fs";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function isPromptVersionArray(value) {
  return Array.isArray(value) && value.every((item) => {
    if (typeof item !== "object" || item === null) {
      return false;
    }
    const version = item;
    return typeof version.id === "string" && typeof version.title === "string" && typeof version.content === "string" && (version.category === void 0 || typeof version.category === "string") && (version.savedAt === void 0 || typeof version.savedAt === "string");
  });
}
function getPromptsFilePath() {
  if (app.isPackaged) {
    return path.join(path.dirname(app.getPath("exe")), "prompts.json");
  }
  return path.join(process.env.APP_ROOT, "prompts.json");
}
function isPromptArray(value) {
  return Array.isArray(value) && value.every((item) => {
    if (typeof item !== "object" || item === null) {
      return false;
    }
    const prompt = item;
    return typeof prompt.id === "string" && typeof prompt.title === "string" && typeof prompt.content === "string" && (prompt.category === void 0 || typeof prompt.category === "string") && (prompt.versions === void 0 || isPromptVersionArray(prompt.versions));
  });
}
async function loadPrompts() {
  const promptsFilePath = getPromptsFilePath();
  try {
    const fileContent = await promises.readFile(promptsFilePath, "utf-8");
    const parsedContent = JSON.parse(fileContent);
    return isPromptArray(parsedContent) ? parsedContent : [];
  } catch (error) {
    const fileError = error;
    if (fileError.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}
async function savePrompts(prompts) {
  const promptsFilePath = getPromptsFilePath();
  await promises.mkdir(path.dirname(promptsFilePath), { recursive: true });
  await promises.writeFile(promptsFilePath, JSON.stringify(prompts, null, 2), "utf-8");
}
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  ipcMain.handle("prompts:load", () => loadPrompts());
  ipcMain.handle("prompts:save", (_event, prompts) => {
    if (!isPromptArray(prompts)) {
      throw new Error("Invalid prompt payload");
    }
    return savePrompts(prompts);
  });
  createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
