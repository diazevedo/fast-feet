import { Op } from 'sequelize';
import { startOfDay, endOfDay, isBefore, isAfter, setHours } from 'date-fns';

import Parcel from '~models/Parcel';

class DeliveriesController {
  async update(req, res) {
    const { parcel_id, courier_id } = req.params;

    const today = new Date();
    const todayStart = startOfDay(today);
    const todayEnd = endOfDay(today);

    const initHour = setHours(new Date(), 8);

    const finishHour = setHours(new Date(), 18);

    if (isBefore(today, initHour) || isAfter(today, finishHour)) {
      return res.status(400).json({ error: 'Your shift has not started yet.' });
    }

    const deliveriesTaken = await Parcel.findAndCountAll({
      where: {
        courier_id,
        start_date: { [Op.between]: [todayStart, todayEnd] },
      },
    });

    if (deliveriesTaken.count >= 5) {
      return res
        .status(400)
        .json({ message: 'You have taken 5 parcels already today.' });
    }

    const parcelStarted = await Parcel.findByPk(parcel_id);

    await parcelStarted.update({ start_date: new Date() });

    return res.json(parcelStarted);
  }
}

export default new DeliveriesController();
