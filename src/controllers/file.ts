import { Request, Response } from 'express';
import httpError from '../errorHandler/httpError/httpError';

import storage from "../config/storage";

export default {
    upload: async(req: Request, res: Response) => {
        try {
            await storage.imageSender(req, res);
        } catch (err) {
            res.status(500).send(httpError(500, "Could not upload the file. " + err));
        }
    },
    getFileList: async(req: Request, res: Response) => {
        try {
            await storage.imageLister(req, res);
        } catch (err) {
            res.status(500).send(httpError(500, "Unable to read list of files!"));
        }
    },
    download: async(req: Request, res: Response) => {
        try {
            const fileName = req.params.name;
            await storage.imageAccessor(`${fileName}`, req, res);
        } catch (err) {
            res.status(500).send(httpError(500, "Could not download the file. " + err));
        }
    },
}