import PDFDocument from 'pdfkit'
import fs from 'fs'
import sizeOf from 'image-size'

async function createPdf(name: string, imageFiles: string[],
    progressCallback: (filename: string) => void): Promise<void> {
    const doc = new PDFDocument({
        autoFirstPage: false
    })
    doc.pipe(fs.createWriteStream(name))
    imageFiles.forEach(file => {
        let dimensions = sizeOf(file)
        doc.addPage({
            size: [dimensions.width || 0, dimensions.height || 0]
        }).image(file, 0, 0)
        progressCallback(file)
    });
    doc.end()
}

export { createPdf }
