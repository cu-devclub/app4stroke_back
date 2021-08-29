import multer from 'multer';
import multerS3 from 'multer-s3';

import s3 from '../config/s3';

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'c4ab726d-2d35-448c-8352-93f18fdbcd62',
        key: function (_req: any, file: any, cb: any) {
            cb(null, file.originalname);
        }
    })
});

export default upload;