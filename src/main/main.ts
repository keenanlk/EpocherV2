import { app, BrowserWindow, Tray, Menu } from 'electron';
import positioner from 'electron-traywindow-positioner';
import path from 'path';
import MenuBuilder from './menu.ts';

/** Handle creating/removing shortcuts on Windows when installing/uninstalling. */
if (require('electron-squirrel-startup')) {
  app.quit();
}

/**
 * Main window instance.
 */
let mainWindow: BrowserWindow | null;
let tray: Tray | null;
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
app.on('ready', () => {
  if (process.platform === 'darwin') {
    app.dock.hide();
  }
  // createMainWindow();
  createTray();
});

/**
 * Emitted when the application is activated. Various actions can
 * trigger this event, such as launching the application for the first time,
 * attempting to re-launch the application when it's already running,
 * or clicking on the application's dock or taskbar icon.
 */
app.on('activate', () => {
  /**
   * On OS X it's common to re-create a window in the app when the
   * dock icon is clicked and there are no other windows open.
   */
  if (BrowserWindow.getAllWindows().length === 0) {
    createTray();
  }
});

/**
 * Emitted when all windows have been closed.
 */
app.on('window-all-closed', () => {
  /**
   * On OS X it is common for applications and their menu bar
   * to stay active until the user quits explicitly with Cmd + Q
   */
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * Create main window
 * @returns {BrowserWindow} Main window instance
 */

const createTray = () => {
  tray = new Tray(path.resolve('assets/epocher.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip('Epocher');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    if (!mainWindow) {
      createMainWindow();
    }
    showWindow();
  });
};

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 360,
    height: 600,
    show: false,
    frame: false,
    resizable: false,
    // autoHideMenuBar: true,
    icon: path.resolve('assets/epocher.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
    },
  });

  // Load the index.html of the app window.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Show window when its ready to
  mainWindow.on('ready-to-show', () => {
    if (mainWindow) mainWindow.show();
  });

  // Close all windows when main window is closed
  mainWindow.on('close', () => {
    mainWindow = null;
  });

  mainWindow.on('blur', () => {
    toggleWindow();
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  return mainWindow;
}

const showWindow = () => {
  if (mainWindow instanceof BrowserWindow) {
    positioner.position(mainWindow, <Electron.Rectangle>tray?.getBounds());
  }
  mainWindow?.show();
};

const toggleWindow = () => {
  if (mainWindow?.isVisible()) return mainWindow.hide();
  return mainWindow && showWindow();
};

/**
 * In this file you can include the rest of your app's specific main process code.
 * You can also put them in separate files and import them here.
 */
