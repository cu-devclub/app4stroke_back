import { Request, Response } from 'express';
import httpError from '../errorHandler/httpError/httpError';

import s3 from '../config/s3';

const download = async (filePath: string, req: Request, res: Response) => {
    try {
        const params = {
            Bucket: "app4stroke",
            Key: filePath
        }

        res.setHeader('Content-Disposition', 'attachment');

        s3.getObject(params)
            .createReadStream()
                .on('error', function(err){
                    res.status(500).send(httpError(500, "Error: " + err));
            }).pipe(res);
    } catch (err) {
        res.status(404).send(httpError(404, "The file could not be accessed."));
    }
};

export default download;