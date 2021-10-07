import s3 from '../config/s3';

export interface deleteResponse {
  success: Boolean;
}

const del = async (buffer: Buffer, filePath: string) => {
  var params = {
    Bucket: 'app4stroke',
    Key: filePath,
  };

  return new Promise<deleteResponse>((resolve, reject) => {
    s3.deleteObject(params)
      .promise()
      .then(() => {
        resolve({
          success: true,
        });
      })
      .catch(() => {
        reject({
          success: false,
        });
      });
  });
};

export default del;
