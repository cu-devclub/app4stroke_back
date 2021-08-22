import { Request, Response } from 'express';

import { Storage } from '@google-cloud/storage';
import { format } from 'util';
import processFile from '../middlewares/upload';

const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('stroke_images_2');

export default {
  upload: async (req: Request, res: Response) => {
    // res.send({ message: "upload" });
    try {
      await processFile(req, res);

      if (!req.file) {
        return res.status(400).send({ message: 'Please upload a file!' });
      }

      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        res.status(500).send({ message: err.message });
      });

      blobStream.on('finish', async (data: any) => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
        );

        try {
          await blob.makePublic();
        } catch {
          return res.status(500).send({
            message: `Uploaded the file successfully, but public access is denied!`,
            url: publicUrl,
          });
        }

        res.status(200).send({
          message: 'Uploaded the file successfully',
          url: publicUrl,
        });
      });

      blobStream.end(req.file.buffer);
    } catch (err) {
      if (err.code == 'LIMIT_FILE_SIZE') {
        return res.status(500).send({
          message: 'File size cannot be larger than 2MB!',
        });
      }

      res.status(500).send({
        message: 'Could not upload the file.',
      });
    }
  },
  getFileList: async (req: Request, res: Response) => {
    // res.send({ message: "get file list" });
    try {
      const [files] = await bucket.getFiles();
      let fileInfos: any = [];

      files.forEach((file) => {
        fileInfos.push({
          name: file.name,
          url: file.metadata.mediaLink,
        });
      });

      res.status(200).send(fileInfos);
    } catch (err) {
      console.log(err);

      res.status(500).send({
        message: 'Unable to read list of files!',
      });
    }
  },
  download: async (req: Request, res: Response) => {
    // res.send({ message: "download" });
    try {
      const [metaData] = await bucket.file(req.params.name).getMetadata();
      res.redirect(metaData.mediaLink);
    } catch (err) {
      res.status(500).send({
        message: 'Could not download the file. ' + err,
      });
    }
  },
};
