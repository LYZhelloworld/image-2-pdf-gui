import { app, BrowserWindow } from 'electron'
import path from 'path'

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'index.preload.js'),
			nodeIntegration: true,
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
