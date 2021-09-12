import { Request, Response } from 'express';
import httpError from '../errorHandler/httpError/httpError';
import bucket from '../config/storage';

const download = async (filePath: string, req: Request, res: Response) => {
    try {
        const file = bucket.file(filePath);
        const readStream = file.createReadStream();

        await file
            .getMetadata()
            .then((metadata) => {
                res.setHeader("content-type", metadata[0].contentType);
                readStream.pipe(res);
            });

    } catch (err) {
        res.status(404).send(httpError(404, "No such file found."));
    }
}

export default download;