import fs from 'fs'
import path from 'path'
const imageType = /\.(?:jpg|png)$/i

async function getImages(path: string): Promise<string[]> {
    let result = fs.readdirSync(path).filter(isImageType)
    result.sort()
    return result
}

function isImageType(filename: string): boolean {
    return filename.match(imageType) !== null
}

function generatePDFName(filepath: string): string {
    return path.join(path.dirname(filepath), path.basename(filepath))
}

export { getImages, generatePDFName }
