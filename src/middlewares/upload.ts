import { Storage } from "@google-cloud/storage";
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("stroke_images_2");

import path from 'path';

const upload = async (fileBuffer: any, filePath: string, fileName: string) => {
    const file = bucket.file(path.join(filePath, fileName));
    file.save(fileBuffer, (err: any) => {
        if (err) {
            console.log(err);
        }
    });
}

export { bucket, upload };