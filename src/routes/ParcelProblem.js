import { Router } from 'express';

import ParcelProblem from '~controllers/ParcelProblemController';

const routes = new Router();

routes.post('/parcels/:parcel_id/problems', ParcelProblem.store);
routes.get('/parcels/problems', ParcelProblem.index);

export default routes;
