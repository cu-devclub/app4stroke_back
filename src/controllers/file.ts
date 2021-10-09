import { Request, Response } from 'express';
import httpError from '../errorHandler/httpError/httpError';

import upload from '../middlewares/upload';
import download from '../middlewares/download';
import storage from '../config/storage';

export default {
  upload: async (req: Request, res: Response) => {
    try {
      const buffer = '';

      const URI = await upload(buffer, 'ml', 'filename');

      res.status(200).send(URI);
    } catch (err) {
      res.status(500).send(httpError(500, 'Could not upload the file. ' + err));
    }
  },
  download: async (req: Request, res: Response) => {
    // try {
    //   const filePath = '';

    //   await download(filePath, req, res);
    // } catch (err) {
    //   res
    //     .status(500)
    //     .send(httpError(500, 'Could not download the file. ' + err));
    // }
    try {
      const dl = await storage.download(req.params.path);
      if (dl instanceof Error) {
        throw new Error();
      }
      if (!(typeof dl.ContentType === 'string')) {
        throw new Error();
      }
      res.setHeader('Content-Type', dl.ContentType);
      res.send(dl.Body);
    } catch (error: any) {}
  },
};
