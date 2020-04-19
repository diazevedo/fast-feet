import { Router } from 'express';

import ParcelProblem from '~controllers/ParcelProblemController';

const routes = new Router();

routes.post('/parcels/:id/problems', ParcelProblem.store);
routes.get('/parcels/problems/:id', ParcelProblem.show);
routes.get('/parcels/problems', ParcelProblem.index);
routes.delete('/parcels/problems/:id', ParcelProblem.delete);

export default routes;
