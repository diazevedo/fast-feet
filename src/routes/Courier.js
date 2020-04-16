import { Router } from 'express';

import CourierController from '~controllers/CourierController';
import * as CourierValidator from '~validators/courier';

// import checkAuth from '~middlewares/jwt';

const routes = Router();
// routes.use(checkAuth);

routes.get('/admin/couriers', CourierController.index);
routes.post('/admin/couriers', CourierValidator.store, CourierController.store);
routes.put(
  '/admin/couriers/:id',
  CourierValidator.update,
  CourierController.update
);
routes.delete(
  '/admin/couriers/:id',
  CourierValidator.update,
  CourierController.delete
);

export default routes;
