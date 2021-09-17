import path from 'path';
import FileType from 'file-type';
import s3 from '../config/s3';

const upload = async (base64: any, filePath: string, fileName: string) => {
  const buffer = Buffer.from(base64, 'base64');

  const { ext, mime } = (await FileType.fromBuffer(buffer)) || {
    ext: 'unknown',
    mime: 'unknown',
  };

  const fullPath = path.join(filePath, fileName + '.' + ext);

  var params = {
    Bucket: "app4stroke",
    Key: fullPath,
    Body: buffer,
  };

  return new Promise<any>((resolve, reject) => {
    s3.putObject(params)
      .promise()
      .then(() => {
        resolve({
          url: `s3://app4stroke/${fullPath}`,
          gsutilURI: `https://app4stroke.s3.ap-southeast-1.amazonaws.com/${fullPath}`,
        });
      })
      .catch(() => {
        reject({});
      });
  })
};

export default upload;