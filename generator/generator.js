const PDFDocument = require('pdfkit')
const fs = require('fs')

function createPDF(name, imageFiles, progressCallback) {
    const doc = new PDFDocument()
    doc.pipe(fs.createWriteStream(name))
}

function getImageDimension(file) {
    // TODO
}

export { createPDF }
