import util from "util";
import multer from "multer";

let processFile = multer().single("file");

let processFileMiddleware = util.promisify(processFile);

export default processFileMiddleware;