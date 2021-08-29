import { Request, Response } from 'express';
import httpError from '../errorHandler/httpError/httpError';
import s3 from '../config/s3';
import dotenv from 'dotenv';

dotenv.config();
const bucketName = "c4ab726d-2d35-448c-8352-93f18fdbcd62";
 
export default {
    fileSender: async(req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).send(httpError(400, "Please upload a file!"));
            }
            const params = {
                Bucket: bucketName,
                Key: req.params.foldername + "/" + req.file.originalname,
                Body: req.file.buffer
            }
            
            s3.upload(params, (err: any, data: any) => {
                if (err) {
                    res.status(500).send(httpError(500, "Error: " + err));
                }
                res.send("File uploaded successfully!");
            });
        } catch (err) {
            res.status(500).send(httpError(500, "Could not upload the file."));
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
            res.status(500).send(httpError(500, "Unable to read list of files!"));
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
            res.status(404).send(httpError(404, "Fail."));
        }
    }
}