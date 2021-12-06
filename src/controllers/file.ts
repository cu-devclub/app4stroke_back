import { Request, Response } from 'express';
import httpError from '../errorHandler/httpError/httpError';

import upload from '../middlewares/upload';
import download from '../middlewares/download';
import storage from '../config/storage';

export default {
  download: async (req: Request, res: Response) => {
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
