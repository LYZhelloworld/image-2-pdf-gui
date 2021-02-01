import fs from 'fs'
import path from 'path'
const imageType = /\.(?:jpg|png)$/i

async function getImages(filepath: string): Promise<string[]> {
    let result = fs.readdirSync(filepath).filter(isImageType).map(file => path.join(filepath, file))
    result.sort()
    return result
}

function isImageType(filename: string): boolean {
    return filename.match(imageType) !== null
}

function generatePDFName(filepath: string): string {
    return path.join(path.dirname(filepath), path.basename(filepath) + '.pdf')
}

export { getImages, generatePDFName }
