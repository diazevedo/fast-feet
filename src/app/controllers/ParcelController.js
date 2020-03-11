import Parcel from '~models/Parcel';
import Recipient from '~models/Recipient';
import Courier from '~models/Courier';
import File from '~models/File';

import Notification from '~schemas/Notification';

import Mail from '~lib/Mail';

class ParcelController {
  async index(req, res) {
    const parcels = await Parcel.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name'],
        },
        {
          model: Courier,
          as: 'courier',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.status(200).json(parcels);
  }

  async store(req, res) {
    const { recipient_id, courier_id, product } = req.body;

    const courier = await Courier.findByPk(req.body.courier_id);
    if (!courier) {
      return res.status(400).json({
        message: 'Something went wrong. Could not find the courier.',
      });
    }

    const recipient = await Recipient.findByPk(req.body.recipient_id);

    if (!recipient) {
      return res.status(400).json({
        message: 'Something went wrong. Could not find the recipient.',
      });
    }

    const parcel = await Parcel.create({ recipient_id, courier_id, product });

    if (!parcel) {
      return res.status(400).json({
        message: 'Something went wrong. Could not create the parcel.',
      });
    }

    await Notification.create({
      content: `New delivery assignment for you and it is ready for pick-up. Recipient: ${recipient.name} Product: ${product}`,
      user: courier.id,
    });

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>?`,
      subject: 'New delivery assigned',
      template: 'assignment',
      context: {
        courier: courier.name,
        recipient: recipient.name,
        product,
      },
    });

    return res.status(200).json({
      parcel: {
        product: parcel.product,
        recipient_id: parcel.recipient_id,
        courier_id: parcel.courier_id,
      },
    });
  }

  async update(req, res) {
    const parcel = await Parcel.findByPk(req.params.id);

    await parcel.update(req.body);

    res.status(200).json(parcel);
  }

  async delete(req, res) {
    const parcel = await Parcel.destroy({ where: { id: req.params.id } });

    const status = parcel > 0 ? 200 : 404;
    const message = parcel > 0 ? 'Parcel removed.' : 'Parcel not found.';

    return res.status(status).json({ message });
  }
}

export default new ParcelController();
