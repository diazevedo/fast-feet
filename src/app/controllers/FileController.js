import * as Yup from 'yup';
import File from '../models/File';

class FileController {
  async store(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'Missing a file.' });
    }

    const schema = Yup.object().shape({
      originalname: Yup.string().required(),
      filename: Yup.string().required(),
    });

    if (!schema.isValid(req.file)) {
      return res.status(400).json({ error: 'Missing a file.' });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });
    return res.json(file);
  }
}

export default new FileController();
