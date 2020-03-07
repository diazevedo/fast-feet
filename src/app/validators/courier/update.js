import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      email: Yup.string().email(),
    });

    await schema.validate(
      {
        id: req.params.id,
        name: req.body.name || '',
        email: req.body.email || '',
      },
      {
        abortEarly: false,
      }
    );

    return next();
  } catch (error) {
    return res.status(400).json({
      error: 'Sorry, validation has failed.',
      messages: error.message,
    });
  }
};
