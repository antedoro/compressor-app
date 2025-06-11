const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const appInfo = require('./package.json');

// Set the application name
app.name = appInfo.productName;

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    title: "Compress JPG",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, process.platform === 'darwin' 
      ? 'build/icon.icns' 
      : process.platform === 'win32' 
        ? 'build/icon.ico' 
        : 'build/icon.png')
  });

  win.loadFile('Compress_AIO.html');

  const template = [
    {
      label: appInfo.productName,
      submenu: [
        {
          label: `About ${appInfo.productName}`,
          click: () => {
            dialog.showMessageBox(win, {
              type: "info",
              title: `About ${appInfo.productName}`,
              message: `${appInfo.productName} v${appInfo.version}\n\n${appInfo.description}\n\nAuthor: ${appInfo.author}`
            });
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'File',
      submenu: [
        { role: 'close' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: `${appInfo.productName} Help`,
          click: async () => {
            dialog.showMessageBox(win, {
              type: "info",
              title: "Help",
              message: "Help content goes here"
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
