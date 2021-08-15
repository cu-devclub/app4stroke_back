import { Request, Response } from 'express';

import storage from '../config/storage';

export default {
  upload: async (req: Request, res: Response) => {
    try {
      await storage.imageSender(req, res);
    } catch (err) {
      res.status(500).send({
        message: 'Could not upload the file. ' + err,
      });
    }
  },
  getFileList: async (req: Request, res: Response) => {
    try {
      await storage.imageLister(req, res);
    } catch (err) {
      res.status(500).send({
        message: 'Unable to read list of files!',
      });
    }
  },
  download: async (req: Request, res: Response) => {
    try {
      const fileName = req.params.name;
      await storage.imageAccessor(`${fileName}`, req, res);
    } catch (err) {
      res.status(500).send({
        message: 'Could not download the file. ' + err,
      });
    }
  },
};
