import ParcelProblem from '~models/ParcelProblem';
import Parcel from '~models/Parcel';
import Courier from '~models/Courier';
import Recipient from '~models/Recipient';
import File from '~models/File';

class ParcelProblemController {
  async show(req, res) {
    const { parcel_id } = req.params;
    const parcelProblem = await ParcelProblem.findOne({ where: { parcel_id } });

    return res.json(parcelProblem);
  }

  async index(req, res) {
    // set constants limit
    const { page = 1 } = req.query;
    const parcelProblems = await ParcelProblem.findAll({
      attributes: ['description', 'created_at'],
      order: ['created_at'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Parcel,
          as: 'parcel',
          attributes: ['product'],
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
    const { parcel_id } = req.params;
    const { description } = req.body;

    const parcelToUpdate = await Parcel.findByPk(parcel_id);
    if (!parcelToUpdate) {
      return res.status(400).json({ message: 'This parcel was not found.' });
    }

    const parcelProblem = await ParcelProblem.create({
      parcel_id,
      description,
    });

    return res.json(parcelProblem);
    // return res.json(parcelProblem);
  }
}

export default new ParcelProblemController();
