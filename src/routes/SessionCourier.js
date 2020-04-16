import { Router } from 'express';

import SessionCourierController from '~controllers/SessionCourierController';

const routes = Router();

routes.post('/sessions/couriers', SessionCourierController.store);

export default routes;
