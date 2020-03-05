import Courier from '~models/Courier';

class CourierController {
  async index(req, res) {
    const couriers = await Courier.findAll({
      attributes: ['id', 'name', 'email'],
    }).catch(({ errors }) =>
      res.status(400).json({ error: errors[0].message })
    );

    res.status(200).json(couriers);
  }

  async store(req, res) {
    const courier = await Courier.create(req.body).catch(({ errors }) =>
      res.status(400).json({ error: errors[0].message })
    );

    const { id, name, email } = courier;

    res.status(201).json({ id, name, email });
  }

  async update(req, res) {
    const { id } = req.params;

    const courier = await Courier.findByPk(id);

    if (!courier) {
      res.status(404).json({ message: 'Courier not found.' });
    }

    await courier
      .update(req.body)
      .catch(({ errors }) =>
        res.status(400).json({ error: errors[0].message })
      );

    res.status(200).json({ courier });
  }

  async delete(req, res) {
    const { id } = req.params;

    const courierUpdated = await Courier.update(
      {
        active: false,
      },
      {
        where: { id },
        returning: true,
      }
    );

    if (courierUpdated[0] === 0) {
      res.status(404).json({ message: 'Courier not found.' });
    }

    const { name, email } = courierUpdated[1][0];

    res.status(200).json({ name, email });
  }
}

export default new CourierController();
