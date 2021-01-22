interface Window {
    api: any
}

document.addEventListener('drop', (event) => {
    event.preventDefault()
    event.stopPropagation()
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