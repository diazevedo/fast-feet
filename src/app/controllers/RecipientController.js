import Recipient from '~models/Recipient';

class RecipientController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body);

    res.status(201).json({ recipient });
  }
}

export default new RecipientController();
