import Courier from '~models/Courier';

class CourierController {
  async store(req, res) {
    const courier = await Courier.create(req.body).catch(error =>
      res.status(400).json({ error: error.errors[0].message })
    );

    const { id, name, email } = courier;

    res.status(201).json({ id, name, email });
  }
}

export default new CourierController();
