import bucket from '../config/storage';
import path from 'path';
import FileType from 'file-type';

const upload = async (buffer: any, filePath: string, fileName: string) => {
  const { ext, mime } = (await FileType.fromBuffer(buffer)) || {
    ext: 'unknown',
    mime: 'unknown',
  };

  const fullPath = path.join(filePath, fileName + '.' + ext);
  const file = bucket.file(fullPath);

  return new Promise<any>((resolve, reject) => {
    file
      .save(buffer)
      .then(() => {
        resolve({
          url: `https://storage.cloud.google.com/stroke_images_3/${fullPath}`,
          gsutilURI: `gs://stroke_images_3/${fullPath}`,
        });
      })
      .catch(() => {
        reject({});
      });
  });
};

export default upload;
