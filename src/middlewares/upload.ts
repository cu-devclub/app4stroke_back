import path from 'path';
import FileType from 'file-type';
import s3 from '../config/s3';

export interface uploadResponse {
  success: Boolean;
  uri?: string;
  url?: string;
  path?: string;
}

const upload = async (buffer: any, filePath: string, fileName: string) => {
  const { ext, mime } = (await FileType.fromBuffer(buffer)) || {
    ext: 'unknown',
    mime: 'unknown',
  };

  const fullPath = path.join(filePath, fileName + '.' + ext);

  var params = {
    Bucket: 'app4stroke',
    Key: fullPath,
    Body: buffer,
  };

  return new Promise<uploadResponse>((resolve, reject) => {
    s3.putObject(params)
      .promise()
      .then(() => {
        resolve({
          success: true,
          uri: `s3://app4stroke/${fullPath}`,
          url: `https://app4stroke.s3.ap-southeast-1.amazonaws.com/${fullPath}`,
          path: fullPath,
        });
      })
      .catch(() => {
        reject({
          success: false,
        });
      });
  });
};

export default upload;
