import bucket from '../config/storage';
import path from 'path';
import FileType from 'file-type';

const upload = async (buffer: any, filePath: string, fileName: string) => {
    const { ext, mime } = await FileType.fromBuffer(buffer) || { ext: 'unknown', mime: 'unknown' }
    console.log(mime);

    const fullPath = path.join(filePath, fileName+"."+ext)
    const file = bucket.file(fullPath);

    file.save(buffer, (err: any) => {
        if (err) {
            console.log(err);
        }
    });

    return { url: `https://storage.cloud.google.com/stroke_images_3/${fullPath}`, gsutilURI: `gs://stroke_images_3/${fullPath}` };
}

export default upload;