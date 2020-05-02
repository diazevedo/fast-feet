import { Op } from 'sequelize';
import { startOfDay, endOfDay, setHours, parseISO, getHours } from 'date-fns';

import Parcel from '~models/Parcel';

class DeliveriesController {
  async update(req, res) {
    const { parcel_id, courier_id } = req.params;
    const { dateStarted } = req.body;

    const today = new Date();
    const todayStart = startOfDay(today);
    const todayEnd = endOfDay(today);

    const deliveryStartTime = getHours(parseISO(dateStarted));

    const initHour = getHours(setHours(new Date(), 8));
    const finishHour = getHours(setHours(new Date(), 17));

    if (deliveryStartTime < initHour || deliveryStartTime > finishHour) {
      return res.status(400).json({ message: 'It is not time to work.' });
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
