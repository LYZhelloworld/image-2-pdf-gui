import { contextBridge } from 'electron'
import { generatePDFName, getImages } from './fileutils'
import { createPDF } from './generator'

contextBridge.exposeInMainWorld(
    'api', {
    generatePDF: (directory: string) => {
        getImages(directory).then(images => {
            if (images.length === 0) return
            let pdf = generatePDFName(directory)
            createPDF(pdf, images, filename => {
                //console.log(filename)
                // TODO: progress
            }).then(() => {
                // TODO: finished
            })
        })
    }
})
