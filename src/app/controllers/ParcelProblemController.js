import ParcelProblem from '~models/ParcelProblem';
import Parcel from '~models/Parcel';
import Courier from '~models/Courier';
import Recipient from '~models/Recipient';
import File from '~models/File';

import Notification from '~schemas/Notification';
import ParcelCancellationMail from '~jobs/ParcelCancellationMail';
import Queue from '~lib/Queue';

class ParcelProblemController {
  async show(req, res) {
    const { id } = req.params;
    const parcelProblems = await ParcelProblem.findAll({
      where: { parcel_id: id },
    });

    return res.json(parcelProblems);
  }

  async index(req, res) {
    // set constants limit
    const { page = 1 } = req.query;
    const parcelProblems = await ParcelProblem.findAll({
      attributes: ['id', 'description', 'created_at'],
      order: ['created_at'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Parcel,
          as: 'parcel',
          attributes: ['id', 'product'],
          include: [
            {
              model: Courier,
              as: 'courier',
              attributes: ['id', 'name', 'email'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['url'],
                },
              ],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    return res.json(parcelProblems);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;
    const parcelToUpdate = await Parcel.findByPk(id);
    if (!parcelToUpdate) {
      return res.status(400).json({ message: 'This parcel was not found.' });
    }

    const parcelProblem = await ParcelProblem.create({
      parcel_id: id,
      description,
    });

    return res.json(parcelProblem);
  }

  async delete(req, res) {
    const { id } = req.params;
    const { parcel_id } = await ParcelProblem.findByPk(id, {
      attributes: ['parcel_id'],
    });

    const parcel = await Parcel.findByPk(parcel_id, {
      include: [
        {
          model: Courier,
          as: 'courier',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
      ],
    });

    const { courier, recipient, product } = parcel;
    await Notification.create({
      content: `Delivery has been canceled. Recipient: ${recipient.name} Product: ${product}`,
      user: courier.id,
    });

    Queue.add(ParcelCancellationMail.key, { courier, recipient, product });

    await parcel.update({ canceled_at: new Date() });

    return res.status(200).json({ courier, recipient, product });
  }
}

export default new ParcelProblemController();
