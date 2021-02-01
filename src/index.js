function toogleDragOverlayer(show) {
    let overlayer = document.getElementById("drag-overlayer")
    if (show) {
        overlayer.style.display = ""
    } else {
        overlayer.style.display = "none"
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
        window.api.generatePDF(file.path)
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