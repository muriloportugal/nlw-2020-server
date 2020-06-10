import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..','..','uploads'),
    filename: (request, file, callback) => {
      const hash = crypto.randomBytes(6).toString('hex');
      const fileName = `${hash}-${file.originalname}`;

      callback(null,fileName);
    }
  }),
  
  fileFilter: (request: Express.Request, file: Express.Multer.File, cb: CallableFunction) => {
    if (!file.mimetype.startsWith('image/')) {
     return cb({error:'Only images is acceptable.'});
    }
    return cb(null, true);
   },
  //Max file size 1MB
  limits:{fileSize: 1024*1024},
}