import PDFDocument from 'pdfkit'
import fs from 'fs'

function createPDF(name: string, imageFiles: string[],
    progressCallback: (id: number, filename: string) => void): void {
    const doc = new PDFDocument()
    doc.pipe(fs.createWriteStream(name))
}

function getImageDimension(file: string) {
    // TODO
}

export { createPDF }
