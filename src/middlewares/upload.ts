import path from 'path';
import FileType from 'file-type';
import s3 from '../config/s3';

const upload = async (buffer: any, filePath: string, fileName: string) => {
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

  s3.putObject(params, function(err) {
    if (err) console.log(err);
  });

  return { url: `s3://app4stroke/${fullPath}`, gsutilURI: `https://app4stroke.s3.ap-southeast-1.amazonaws.com/${fullPath}` };
};

export default upload;
