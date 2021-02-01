import { generatePDFName, getImages } from './fileutils/fileutils'
import { createPDF } from './generator/generator'
import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
    generatePDF: generatePDF
})

function generatePDF(directory: string) {
    getImages(directory).then(images => {
        if (images.length === 0) return
        let pdf = generatePDFName(directory)
        createPDF(pdf, images, () => {
            //console.log(filename)
            // TODO: progress
        }).then(() => {
            // TODO: finished
        })
    })
}