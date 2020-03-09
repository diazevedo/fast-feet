import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      recipient_id: Yup.number(),
      courier_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string().min(1),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    const parcel = {
      ...req.body,
      id: req.params.id,
    };

    await schema.validate(parcel, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Sorry, validation has failed.', messages: error.inner });
  }
};
