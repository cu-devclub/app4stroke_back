import { Storage } from '@google-cloud/storage';
const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('stroke_images_3');

export default bucket;
