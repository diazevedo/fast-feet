import * as Yup from 'yup';

import RecipientStore from './RecipientStore';

export default async (req, res, next) => {
  try {
    RecipientStore(req, res, next);
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    await schema.validate(req.params, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Sorry, validation has failed.', messages: error.inner });
  }
};
