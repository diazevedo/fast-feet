import { Router } from 'express';

import checkAuth from '~middlewares/jwt';

import SessionController from '~controllers/SessionController';
import validateSessionStore from '~validators/SessionStore';

import RecipientController from '~controllers/RecipientController';
import validateRecipientStore from '~validators/RecipientStore';
import validateRecipentUpdate from '~validators/RecipientUpdate';

import CourierController from '~controllers/CourierController';
import validateCourierStore from '~validators/CourierStore';

const routes = new Router();

routes.get('/', (req, res) => res.json({ status: 'Working' }));

routes.post('/sessions', validateSessionStore, SessionController.store);

/* Routes that need authentication */
routes.use(checkAuth);
routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:id',
  validateRecipentUpdate,
  validateRecipientStore,
  RecipientController.update
);

routes.get('/couriers', CourierController.index);
routes.post('/couriers', validateCourierStore, CourierController.store);
routes.put('/couriers/:id', CourierController.update);
routes.delete('/couriers/:id', CourierController.delete);

export default routes;
