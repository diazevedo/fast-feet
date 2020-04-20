import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string()
        .required()
        .min(1),
      address_complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      post_code: Yup.string()
        .required()
        .min(4),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({ error: 'Sorry, validation has failed.' });
  }
};
