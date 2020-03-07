import Parcel from '~models/Parcel';

class ParcelController {
  async index(req, res) {
    return res.status(200).json({ message: 'ok' });
  }

  async store(req, res) {
    const { recipient_id, courier_id, product } = req.body;

    const parcel = await Parcel.create({ recipient_id, courier_id, product });

    return res.status(200).json({
      parcel: {
        product: parcel.product,
        recipient_id: parcel.recipient_id,
        courier_id: parcel.courier_id,
      },
    });
  }
}

export default new ParcelController();
