import { Request, Response } from 'express';
import httpError from '../errorHandler/httpError/httpError';
import storage from '../config/storage';
import auth from '../middlewares/auth';

export default {
  download: async (req: Request, res: Response) => {
    auth(req, res);
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
