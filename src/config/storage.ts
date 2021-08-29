import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import httpError from '../errorHandler/httpError/httpError';

import s3 from '../config/s3';

dotenv.config();
const bucketName = "c4ab726d-2d35-448c-8352-93f18fdbcd62";
 
export default {
    fileSender: async(req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.files) {
                return res.status(400).send(httpError(400, "Please upload a file!"));
            }
            res.status(200).send("The file was uploaded succesfully!");
        } catch (err) {
            res.status(500).send(httpError(500, "The file could not be uploaded."));
        }
    },
    fileLister: async(req: Request, res: Response) => {
        try {
            const params = {
                Bucket: bucketName
            }
            const keys: any = [];
            s3.listObjectsV2(params, (err, data) => {
                if (err) {
                    res.status(500).send(httpError(500, "Error: "+ err));
                }
                res.status(200).send(data);
            });
        } catch (err) {
            res.status(500).send(httpError(500, "The list of files could not be read."));
        }
    },
    fileAccessor: async(req: Request, res: Response) => {
        try {
            const params = {
                Bucket: bucketName,
                Key: req.params.foldername + "/" + req.params.filename
            }
    
            res.setHeader('Content-Disposition', 'attachment');
    
            s3.getObject(params)
                .createReadStream()
                    .on('error', function(err){
                        res.status(500).send(httpError(500, "Error: " + err));
                }).pipe(res);
        } catch (err) {
            res.status(404).send(httpError(404, "The file could not be accessed."));
        }
    }
}