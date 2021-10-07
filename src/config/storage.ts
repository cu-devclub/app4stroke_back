import { S3storage } from './cloudStorage';
import dotenv from 'dotenv';

dotenv.config();

export default new S3storage(
  process.env.AWS_ACCESS_KEY_ID || '',
  process.env.AWS_SECRET_ACCESS_KEY || '',
  process.env.AWS_DEFAULT_REGION || '',
  process.env.AWS_BUCKET_NAME || '',
);
