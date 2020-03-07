import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

const Multer = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (error, res) => {
        if (error) return cb(error);

        const fileNameCrypted =
          res.toString('hex') + extname(file.originalname);
        /** null because the first is the error called above */
        return cb(null, fileNameCrypted);
      });
    },
  }),
};

export default Multer;
