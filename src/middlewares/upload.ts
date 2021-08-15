import util from 'util';
import multer from 'multer';

const processFile = multer().single('file');

const processFileMiddleware = util.promisify(processFile);

export default processFileMiddleware;
