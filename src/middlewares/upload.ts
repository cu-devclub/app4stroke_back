import bucket from '../config/storage';
import path from 'path';
import FileType from 'file-type';

const upload = async (base64: any, filePath: string, fileName: string) => {
    const buffer = Buffer.from(base64, 'base64');
    const { ext, mime } = await FileType.fromBuffer(buffer) || { ext: 'unknown', mime: 'unknown' }
    console.log(mime);

    const fullPath = path.join(filePath, fileName+"."+ext)
    const file = bucket.file(fullPath);

    file.save(buffer, (err: any) => {
        if (err) {
            console.log(err);
        }
    });

    return `gs://stroke_images_3/${fullPath}`;
}

export default upload;
