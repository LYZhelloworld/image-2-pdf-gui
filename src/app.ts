import { IpcMainEvent } from 'electron/main'
import { generatePdfName, getImages } from './fileutils/fileutils'
import { createPdf } from './generator/generator'

function generatePdf(event: IpcMainEvent, directory: string) {
    getImages(directory).then(images => {
        if (images.length === 0) return
        let pdf = generatePdfName(directory)
        createPdf(pdf, images, (filename: string) => {
            event.sender.send('pdf-generation-progress', filename)
        }).then(() => {
            event.sender.send('pdf-generation-completed')
        })
    })
}

export { generatePdf }