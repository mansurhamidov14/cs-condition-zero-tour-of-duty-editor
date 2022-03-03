const path = require('path');
require('electron-reloader')(module);

const {
  app,
  dialog,
  BrowserWindow,
  nativeTheme,
  Menu
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
            click: () => openFile('BotProfile', ['db'], [
              'easy-missions',
              'normal-missions',
              'hard-missions',
              'expert-missions'
            ])
          },
          {
            id: 'easy-missions',
            label: 'Easy missions',
            accelerator: 'Ctrl+Shift+E',
            enabled: false,
            click: () => openFile('CareerEasyMissions', ['vdf'])
          },
          {
            id: 'normal-missions',
            label: 'Normal missions',
            accelerator: 'Ctrl+Shift+N',
            enabled: false,
            click: () => openFile('CareerNormalMissions', ['vdf'])
          },
          {
            id: 'hard-missions',
            label: 'Hard missions',
            accelerator: 'Ctrl+Shift+H',
            enabled: false,
            click: () => openFile('CareerHardMissions', ['vdf'])
          },
          {
            id: 'expert-missions',
            label: 'Expert missions',
            accelerator: 'Ctrl+Shift+X',
            enabled: false,
            click: () => openFile('CareerExpertMissions', ['vdf'])
          },
        ]
      }
    ]
  }
];

if (isDev) {
  mainMenuTemplate.push({
    label: 'Open dev tools',
    click: (item, window) => {
      window.toggleDevTools({ mode: 'detach' });
    }
  })
}

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
Menu.setApplicationMenu(mainMenu);

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
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
  }).then(({ filePaths }) => {
    fs.readFile(filePaths[0], 'utf-8', (err, data) => {
      if (data) {
        win.webContents.send(`${name}:loaded`, data);
        itemsToEnable.forEach(function (item) {
          Menu.getApplicationMenu().getMenuItemById(item).enabled = true;
        })
      }
    });
  });
}

nativeTheme.themeSource = 'dark';
