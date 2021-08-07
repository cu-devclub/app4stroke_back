import util from "util";
import multer from "multer";

const maxSize = 2 * 1024 * 1024;

let processFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");

let processFileMiddleware = util.promisify(processFile);

export default processFileMiddleware;