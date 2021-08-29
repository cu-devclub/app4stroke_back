import { Request, Response, NextFunction } from 'express';
import httpError from '../errorHandler/httpError/httpError';

import storage from "../config/storage";

export default {
    upload: async(req: Request, res: Response, next: NextFunction) => {
        try {
            await storage.fileSender(req, res, next);
        } catch (err) {
            res.status(500).send(httpError(500, "The file could not be uploaded. " + err));
        }
    },
    getFileNames: async(req: Request, res: Response) => {
        try {
            await storage.fileLister(req, res);
        } catch (err) {
            res.status(500).send(httpError(500, "The list of files could not be read. " + err));
        }
    },
    download: async(req: Request, res: Response) => {
        try {
            await storage.fileAccessor(req, res);
        } catch (err) {
            res.status(500).send(httpError(500, "The file could not be downloaded. " + err));
        }
    }
}