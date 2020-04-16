import { Router } from 'express';

import RecipientController from '~controllers/RecipientController';
import * as RecipientValidator from '~validators/recipient/';

import checkAuth from '~middlewares/jwt';

const routes = Router();
routes.use(checkAuth);
routes.delete('/recipients/:id', RecipientController.delete);
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientValidator.store, RecipientController.store);
routes.put(
  '/recipients/:id',
  RecipientValidator.update,
  RecipientValidator.store,
  RecipientController.update
);

export default routes;
