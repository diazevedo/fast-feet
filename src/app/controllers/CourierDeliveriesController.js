import { Op } from 'sequelize';

import Recipient from '~models/Recipient';
import Parcel from '~models/Parcel';

class CourierDeliveriesController {
  async index(req, res) {
    const { courier_id } = req.params;

    const where = { courier_id };

    if (req.query.status === 'pending') {
      where.end_date = { [Op.eq]: null };
    }

    if (req.query.status === 'delivered') {
      where.end_date = { [Op.not]: null };
    }

    const parcelsDelivered = await Parcel.findAll({
      where,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'address_complement',
            'state',
            'city',
            'post_code',
          ],
        },
      ],
    });

    return res.json(parcelsDelivered);
  }

  async show(req, res) {
    const { courier_id, parcel_id: id } = req.params;

    const parcelDelivered = await Parcel.findOne({
      where: {
        courier_id,
        id,
      },
    });

    return res.json(parcelDelivered);
  }

  async update(req, res) {
    const { parcel_id } = req.params;

    const parcelDelivered = await Parcel.findByPk(parcel_id);

    if (!parcelDelivered) {
      return res.status(404).json({ error: 'Parcel not found.' });
    }

    const updateValues = {
      end_date: new Date(),
    };

    if (req.body.file_id) {
      updateValues.signature_id = req.body.file_id;
    }

    await parcelDelivered.update(updateValues);

    return res.json(parcelDelivered);
  }
}

export default new CourierDeliveriesController();
