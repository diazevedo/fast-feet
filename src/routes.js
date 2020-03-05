import { Router } from 'express';

import validateSessionStore from './app/validators/SessionStore';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.get('/', (req, res) => res.json({ status: 'Working' }));

export default routes;
