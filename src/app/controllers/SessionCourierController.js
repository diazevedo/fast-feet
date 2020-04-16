import jwt from 'jsonwebtoken';
import Courier from '~models/Courier';
import File from '~models/File';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { id } = req.body;

    const courier = await Courier.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    });

    if (!courier) {
      return res.status(401).json({ error: 'Courier not found.' });
    }

    if (!courier.active) {
      return res.status(401).json({ error: 'Your profile is not active.' });
    }

    return res.json({
      courier,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
