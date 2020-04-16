import { Router } from 'express';

import ParcelController from '~controllers/ParcelController';
import * as ParcelValidator from '~validators/parcel/';

import checkAuth from '~middlewares/jwt';

const routes = new Router();

routes.use(checkAuth);

routes.get('/parcels', ParcelController.index);
routes.post('/parcels', ParcelValidator.store, ParcelController.store);
routes.put('/parcels/:id', ParcelValidator.update, ParcelController.update);
routes.delete('/parcels/:id', ParcelValidator.del, ParcelController.delete);
routes.get('/parcels/:id', ParcelController.show);

export default routes;
