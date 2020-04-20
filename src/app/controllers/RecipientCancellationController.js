import Recipient from '~models/Recipient';

class ReciepientCancellationController {
  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      res.status(404).json({ message: 'Recipient not found.' });
    }

    await recipient.update({ active: false });

    res.status(201).json({ recipient });
  }
}

export default new ReciepientCancellationController();
