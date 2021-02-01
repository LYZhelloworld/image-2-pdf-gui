import { generatePDFName, getImages } from './fileutils/fileutils'
import { createPDF } from './generator/generator'

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

function toogleDragOverlayer(show: boolean) {
    let overlayer = document.getElementById("drag-overlayer")
    if (show) {
        overlayer!.style.display = ""
    } else {
        overlayer!.style.display = "none"
    }
}

document.addEventListener('drop', (event) => {
    event.preventDefault()
    event.stopPropagation()
    toogleDragOverlayer(false)
    let files = event.dataTransfer?.files
    if (!files) return
    for (let i = 0; i < files.length; i++) {
        let file = files[i]
        if (file.type !== "") continue
        generatePDF(file.path)
    }
})

document.addEventListener('dragover', (event) => {
    event.preventDefault()
    event.stopPropagation()
})

document.addEventListener('dragenter', (event) => {
    if (event.target === document.getElementById('drag-area'))
        toogleDragOverlayer(true)
})

document.addEventListener('dragleave', (event) => {
    if (event.target === document.getElementById('drag-area'))
        toogleDragOverlayer(false)
})