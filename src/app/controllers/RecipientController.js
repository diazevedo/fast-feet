import Recipient from '~models/Recipient';

class RecipientController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body);

    res.status(201).json({ recipient });
  }

  async update(req, res) {
    console.log(req.params.id);
    res.status(201).json({ message: 'ok' });
  }
}

export default new RecipientController();
