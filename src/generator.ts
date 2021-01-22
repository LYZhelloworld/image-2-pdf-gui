import PDFDocument from 'pdfkit'
import fs from 'fs'

async function createPDF(name: string, imageFiles: string[],
    progressCallback: (filename: string) => void): Promise<void> {
    const doc = new PDFDocument()
    doc.pipe(fs.createWriteStream(name))
    imageFiles.forEach(file => {
        doc.addPage().image(file, 0, 0)
        progressCallback(file)
    });
    doc.end()
}

export { createPDF }
