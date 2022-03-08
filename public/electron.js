const path = require('path');
try {
  require('electron-reloader')(module)
} catch (_) {}

const {
  app,
  dialog,
  BrowserWindow,
  nativeTheme,
  Menu,
  ipcMain
} = require('electron');
const isDev = require('electron-is-dev');
const fs = require('fs');

let win;

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        submenu: [
          {
            label: 'Bot profile',
            accelerator: 'Ctrl+Shift+B',
            click: () => openFile('BotCampaignProfile', ['db'], [
              'easy-missions',
              'normal-missions',
              'hard-missions',
              'expert-missions',
              'save',
              'save-as'
            ])
          },
          {
            id: 'easy-missions',
            label: 'Easy missions',
            accelerator: 'Ctrl+Shift+E',
            enabled: isDev,
            click: () => openFile('CareerEasyMissions', ['vdf'])
          },
          {
            id: 'normal-missions',
            label: 'Normal missions',
            accelerator: 'Ctrl+Shift+N',
            enabled: isDev,
            click: () => openFile('CareerNormalMissions', ['vdf'])
          },
          {
            id: 'hard-missions',
            label: 'Hard missions',
            accelerator: 'Ctrl+Shift+H',
            enabled: isDev,
            click: () => openFile('CareerHardMissions', ['vdf'])
          },
          {
            id: 'expert-missions',
            label: 'Expert missions',
            accelerator: 'Ctrl+Shift+X',
            enabled: isDev,
            click: () => openFile('CareerExpertMissions', ['vdf'])
          },
        ]
      },
      {
        id: "save",
        enabled: isDev,
        label: 'Save',
        accelerator: 'Ctrl+S',
        click: () => sendEvent('saveFile')
      },
      {
        id: "save-as",
        enabled: isDev,
        label: 'Save as',
        accelerator: 'Ctrl+Alt+S',
        click: () => sendEvent('saveFileAs')
      }
    ]
  }
];

if (isDev) {
  mainMenuTemplate.push({
    label: 'Toggle dev tools',
    click: (item, window) => {
      window.toggleDevTools({ mode: 'detach' });
    }
  });
}

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
Menu.setApplicationMenu(mainMenu);

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: __dirname + '/favicon.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  win.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function openFile(name, extensions, itemsToEnable = []) {
  dialog.showOpenDialog(win, {
    properties: ['openFile'],
    filters: [
      { name: name, extensions: extensions },
      { name: 'All Files', extensions: ['*'] }
    ]
  }).then(({ canceled, filePaths }) => {
    if (!canceled) {
      fs.readFile(filePaths[0], 'utf-8', (err, content) => {
        if (content) {
          win.webContents.send(`${name}:loaded`, {path: filePaths[0], content});
          itemsToEnable.forEach(function (item) {
            Menu.getApplicationMenu().getMenuItemById(item).enabled = true;
          })
        }
      });
    }
  });
}

function sendEvent (event) {
  win.webContents.send(event);
}

ipcMain.on('saveFile', (e, data) => fs.writeFileSync(data.path, data.content));
ipcMain.on('saveFileAs', (e, data) => {
  dialog.showSaveDialog(win, {
    filters: [{
      name: data.name, extensions: [data.extension]
    }]
  }).then(({ canceled, filePath }) => {
    if (!canceled) {
      fs.writeFileSync(filePath, data.content);
      win.webContents.send('saveFileAsResponse', filePath);
    } else {
      win.webContents.send('saveFileAsResponse');
    }
  });
});

nativeTheme.themeSource = 'dark';
