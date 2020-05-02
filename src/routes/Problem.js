import { Router } from 'express';

import ProblemController from '~controllers/ProblemController';

const routes = new Router();

routes.get('/problems/:id', ProblemController.show);

export default routes;
