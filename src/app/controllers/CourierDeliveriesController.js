import { Op } from 'sequelize';
// import Courier from 'Courier';
import Parcel from '~models/Parcel';

class CourierDeliveriesController {
  async index(req, res) {
    const { courier_id } = req.params;

    const parcelsDelivered = await Parcel.findAll({
      where: {
        courier_id,
        end_date: { [Op.not]: null },
      },
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

    await parcelDelivered.update({ end_date: new Date() });

    return res.json(parcelDelivered);
  }
}

export default new CourierDeliveriesController();
