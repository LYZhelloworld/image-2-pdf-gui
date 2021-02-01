import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { generatePdf } from './app'

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			contextIsolation: true
		}
	})

	win.loadFile(path.join(__dirname, 'index.html'))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	//if (process.platform !== 'darwin') {
	app.quit()
	//}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

ipcMain.on('generate-pdf', generatePdf)