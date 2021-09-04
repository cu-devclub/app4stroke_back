import { Request, Response } from 'express';
import httpError from '../errorHandler/httpError/httpError';

import upload from "../middlewares/upload";

export default {
    upload: async(req: Request, res: Response) => {
        try {
            const base64 = "";

            const URI = await upload(base64, "folder", "apple");

            res.status(200).send(URI);
        } catch (err) {
            res.status(500).send(httpError(500, "Could not upload the file. " + err));
        }
    },
}