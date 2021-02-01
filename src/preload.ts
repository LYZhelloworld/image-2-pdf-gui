import { contextBridge, ipcRenderer } from 'electron'

interface Callback {
    pdfGenerationProgress: (filename: string) => void
    pdfGenerationCompleted: () => void
}

let callbackFn: Callback = {
    pdfGenerationProgress: (_) => {},
    pdfGenerationCompleted: () => {}
}

contextBridge.exposeInMainWorld('api', {
    generatePDF: (filePath: string) => ipcRenderer.send('generate-pdf', filePath),
    onPDFGeneratinProgress: (callback: (filename: string) => void) => {
        callbackFn.pdfGenerationProgress = callback
    },
    onPDFGenerationCompleted: (callback: () => void) => {
        callbackFn.pdfGenerationCompleted = callback
    }
})

ipcRenderer.on('pdf-generation-progress', (_: Electron.IpcRendererEvent, filename: string) => {
    callbackFn.pdfGenerationProgress(filename)
})

ipcRenderer.on('pdf-generation-completed', (_: Electron.IpcRendererEvent) => {
    callbackFn.pdfGenerationCompleted()
})