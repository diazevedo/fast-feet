import { Router } from 'express';

import checkAuth from '~middlewares/jwt';

import SessionController from '~controllers/SessionController';
import validateSessionStore from '~validators/SessionStore';

import RecipientController from '~controllers/RecipientController';
import validateRecipientStore from '~validators/RecipientStore';

const routes = new Router();

routes.get('/', (req, res) => res.json({ status: 'Working' }));
routes.post('/sessions', validateSessionStore, SessionController.store);

/* Routes that need authentication */
routes.use(checkAuth);
routes.post('/recipients', validateRecipientStore, RecipientController.store);

export default routes;
