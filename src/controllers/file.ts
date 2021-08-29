import { Request, Response } from 'express';
import httpError from '../errorHandler/httpError/httpError';

import storage from "../config/storage";

export default {
    upload: async(req: Request, res: Response) => {
        try {
            await storage.fileSender(req, res);
        } catch (err) {
            res.status(500).send(httpError(500, "Could not upload the file. " + err));
        }
    },
    getFileNames: async(req: Request, res: Response) => {
        try {
            await storage.fileLister(req, res);
        } catch (err) {
            res.status(500).send(httpError(500, "Unable to read list of files!"));
        }
    },
    download: async(req: Request, res: Response) => {
        try {
            await storage.fileAccessor(req, res);
        } catch (err) {
            res.status(500).send(httpError(500, "Could not download the file. " + err));
        }
    }
}