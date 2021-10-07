import path from 'path';
import FileType from 'file-type';

export interface uploadResponse {
  success: Boolean;
  uri?: string;
  url?: string;
  path?: string;
}

export interface deleteResponse {
  success: Boolean;
}

export interface storage {
  upload(
    buffer: Buffer,
    location: string,
    fileName: string,
  ): Promise<uploadResponse>;
  download(path: string): Promise<Object | Error>;
  delete(path: string): Promise<deleteResponse>;
}

//
//
//  | ==================== |
//  |    AWS S3 Storage    |
//  | ==================== |
//
//
import AWS from 'aws-sdk';

class S3storage implements storage {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
  s3: AWS.S3;

  constructor(
    accessKeyId: string,
    secretAccessKey: string,
    region: string,
    bucket: string,
  ) {
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.region = region;
    this.bucket = bucket;
    this.s3 = new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });
  }

  async upload(
    buffer: Buffer,
    location: string,
    fileName: string,
  ): Promise<uploadResponse> {
    let { ext, mime } = (await FileType.fromBuffer(buffer)) || {
      ext: 'unknown',
      mime: 'unknown',
    };

    let fullPath = path.join(location, fileName + '.' + ext);

    let params = {
      Bucket: this.bucket,
      Key: fullPath,
      Body: buffer,
      ContentType: mime.toString(),
    };

    return new Promise((resolve, reject) => {
      this.s3.putObject(params, async (err: AWS.AWSError) => {
        if (err) {
          reject({
            success: false,
          });
        } else {
          resolve({
            success: true,
            uri: `s3://${this.bucket}/${fullPath}`,
            url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${fullPath}`,
            path: fullPath,
          });
        }
      });
    });
  }

  async download(path: string): Promise<AWS.S3.GetObjectOutput | AWS.AWSError> {
    let params = {
      Bucket: this.bucket,
      Key: path,
    };
    return new Promise((resolve, reject) => {
      this.s3.getObject(
        params,
        async (err: AWS.AWSError, data: AWS.S3.GetObjectOutput) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  async delete(path: string): Promise<deleteResponse> {
    let params = {
      Bucket: this.bucket,
      Key: path,
    };
    return new Promise((resolve, reject) => {
      this.s3.deleteObject(params, async (err: Error, data: Object) => {
        if (err) {
          reject({
            success: false,
          });
        } else {
          resolve({
            success: true,
          });
        }
      });
    });
  }
}

//
//
//  | ==================== |
//  | Google Cloud Storage |
//  | ==================== |
//
//
import { Bucket, Storage } from '@google-cloud/storage';

class googleStorage implements storage {
  keyFilename: string;
  bucket: Bucket;

  constructor(keyFilename: string, bucket: string) {
    this.keyFilename = keyFilename;
    this.bucket = new Storage({ keyFilename: 'google-cloud-key.json' }).bucket(
      bucket,
    );
  }

  async upload(
    buffer: Buffer,
    location: string,
    fileName: string,
  ): Promise<uploadResponse> {
    let { ext, mime } = (await FileType.fromBuffer(buffer)) || {
      ext: 'unknown',
      mime: 'unknown',
    };

    let fullPath = path.join(location, fileName + '.' + ext);
    let file = this.bucket.file(fullPath);

    return new Promise((resolve, reject) => {
      file.save(buffer, async (err) => {
        if (err) {
          reject({
            success: false,
          });
        } else {
          resolve({
            success: true,
            uri: `gs://${this.bucket.name}/${fullPath}`,
            url: `https://storage.cloud.google.com/${this.bucket.name}/${fullPath}`,
            path: fullPath,
          });
        }
      });
    });
  }

  async download(path: string): Promise<Object | Error> {
    let file = this.bucket.file(path);
    return new Promise((resolve, reject) => {
      file.getMetadata(async (err: Error, metadata: Object) => {
        if (err) {
          reject(err);
        } else {
          resolve(metadata);
        }
      });
    });
  }

  async delete(path: string): Promise<deleteResponse> {
    let file = this.bucket.file(path);

    return new Promise((resolve, reject) => {
      file.delete(async (err: Error) => {
        if (err) {
          reject({
            success: false,
          });
        } else {
          resolve({
            success: true,
          });
        }
      });
    });
  }
}

export { S3storage, googleStorage };
