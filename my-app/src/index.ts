import { app, BrowserWindow, ipcMain, dialog } from 'electron';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
import fs from 'fs';
import * as os from 'os';
import * as path from 'path';
// import { initialize, enable } from '@electron/remote/main';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// initialize();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    },
    icon: '../logo.png'
  });

  // enable(mainWindow.webContents);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);
app.on('ready', () => {
  const tempDir = path.join(os.tmpdir(), 'UserTests');
  fs.mkdirSync(tempDir, { recursive: true });

  const files = ['UserTestFile.cy.js', 'TestBlock.cy.js'];
  files.forEach(file => {
    const filePath = path.join(tempDir, file);
    fs.writeFileSync(filePath, ''); // creates file with empty content
  });

  createWindow();
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('save-file', async (event, content) => {
  const { filePath } = await dialog.showSaveDialog({
    title: 'Save your file',
    defaultPath: 'UserTestFile.cy.js',
    filters: [{ name: 'JavaScript', extensions: ['js'] }],
  });

  if (filePath) {
    fs.writeFileSync(filePath, content);
  }
});