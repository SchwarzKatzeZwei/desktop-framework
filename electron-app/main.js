const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  // Developer tools Open
  win.webContents.openDevTools();
};

// Electronが初期化されるときに実行される
app.whenReady().then(() => {
  createWindow();

  // 開いたウインドウがない場合にウインドウを開く (for MacOS)
  app.on("activate", () => {
    console.log("Event:activate");
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// ###########################
// #### Life Cycle Events ####
// ###########################
//全ウインドウを閉じた時にアプリを終了する
app.on("window-all-closed", () => {
  console.log("Event:window-all-closed");
  if (process.platform !== "darwin") app.quit();
});
