import Recipient from '~models/Recipient';

class RecipientController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body);

    res.status(201).json({ recipient });
  }

  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      res.status(404).json({ message: 'Recipient not found.' });
    }

    await recipient.update(req.body);

    res.status(201).json({ recipient });
  }
}

export default new RecipientController();
