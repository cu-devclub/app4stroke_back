import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

import s3 from '../config/s3';

const upload = (foldername: string, filename: string) => {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: 'c4ab726d-2d35-448c-8352-93f18fdbcd62',
            key: function (req: any, file: any, cb: any) {
                const fullPath = path.join(foldername, filename);
                cb(null, fullPath);
            }
        })
    });
}

export default upload;