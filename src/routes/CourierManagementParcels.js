import { Router } from 'express';
import CourierDeliveriesController from '~controllers/CourierDeliveriesController';
import DeliveriesController from '~controllers/DeliveriesController';

const routes = Router();

// all parcels delivered by a certain courier ==> CourierDeliveriesController.index
routes.get(
  '/couriers/:courier_id/deliveries/',
  CourierDeliveriesController.index
);

// see only one delivery ==> CourierDeliveriesController.show
routes.get(
  '/couriers/:courier_id/deliveries/:parcel_id',
  CourierDeliveriesController.show
);

// all parcels to be delivered by a certain courier ==> CourierDeliveriesController.index
routes.get('/couriers/:courier_id/deliveries/opened', (req, res) => {
  res.json({ ok: 'all deliveries To BE done' });
});

// To finish a parcel ==> CourierDeliveriesController.update
routes.put(
  '/couriers/:courier_id/deliveries/:parcel_id/finish',
  CourierDeliveriesController.update
);

// To start an order ==> DeliveriesController.update
routes.put(
  '/couriers/:courier_id/deliveries/:parcel_id/start',
  DeliveriesController.update
);

export default routes;
