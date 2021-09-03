import { Request, Response } from "express";
import httpError from '../errorHandler/httpError/httpError';

import { bucket, upload } from "../middlewares/upload";

export default {
    imageSender: async(req: Request, res: Response) => {
        try {
            await upload(buffer, "folder", "file");

            res.status(200).send("The file was successfully uploaded.");

        } catch (err) {
            res.status(500).send(httpError(500, "Could not upload the file."));
        }
    },
    imageLister: async(req: Request, res: Response) => {
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
            res.status(500).send(httpError(500, "Unable to read list of files!"));
        }
    },
    imageAccessor: async(fileUrl: string, req: Request, res: Response) => {
        try {
            const file = bucket.file(fileUrl);
            const readStream = file.createReadStream();

            await file
                .getMetadata()
                .then((metadata) => {
                    res.setHeader("content-type", metadata[0].contentType);
                    readStream.pipe(res);
                });

        } catch (err) {
            res.status(404).send(httpError(404, "Fail"));
        }
    }
}