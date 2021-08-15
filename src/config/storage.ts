import { Request, Response } from 'express';

import { format } from 'util';
import processFile from '../middlewares/upload';
import { Storage } from '@google-cloud/storage';
const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('stroke_images_2');

export default {
  imageSender: async (req: Request, res: Response) => {
    try {
      await processFile(req, res);

      if (!req.file) {
        return res.status(400).send({
          message: 'Please upload a file!',
        });
      }

      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        res.status(500).send({
          message: err.message,
        });
      });

      blobStream.on('finish', () => {
        const url = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
        );

        res.status(200).send({
          message: 'Uploaded the file successfully!',
          url: url,
        });
      });

      blobStream.end(req.file.buffer);
    } catch (err) {
      res.status(500).send({
        message: 'Could not upload the file.',
      });
    }
  },
  imageLister: async (req: Request, res: Response) => {
    try {
      const [files] = await bucket.getFiles();
      const fileInfos: any = [];

      files.forEach((file) => {
        fileInfos.push({
          name: file.name,
          url: file.metadata.mediaLink,
        });
      });

      res.status(200).send(fileInfos);
    } catch (err) {
      res.status(500).send({
        message: 'Unable to read list of files!',
      });
    }
  },
  imageAccessor: async (fileUrl: string, req: Request, res: Response) => {
    try {
      const file = bucket.file(fileUrl);
      const readStream = file.createReadStream();

      await file.getMetadata().then((metadata) => {
        res.setHeader('content-type', metadata[0].contentType);
        readStream.pipe(res);
      });
    } catch (err) {
      res.status(404).send({
        success: false,
      });
    }
  },
};
