const { app, BrowserWindow } = require('electron');
const localShortcut = require('electron-localshortcut');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('index.html');

  localShortcut.register(win, 'F12', () => {
    win.webContents.openDevTools();
  });

  win.on('close', () => {
    localShortcut.unregisterAll(win);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
