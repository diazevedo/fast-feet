import { Router } from 'express';

import SessionController from '~controllers/SessionController';
import validateSessionStore from '~validators/session/store';

const routes = Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

export default routes;
