import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import checkAuth from '~middlewares/jwt';

import SessionController from '~controllers/SessionController';
import validateSessionStore from '~validators/session/store';

import RecipientController from '~controllers/RecipientController';
import * as RecipientValidator from '~validators/recipient/';

import CourierController from '~controllers/CourierController';
import * as CourierValidator from '~validators/courier';

import FileController from '~controllers/FileController';

import ParcelController from '~controllers/ParcelController';
import * as ParcelValidator from '~validators/parcel/';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.json({ status: 'Working' }));
/** Sessions */
routes.post('/sessions', validateSessionStore, SessionController.store);

/* Routes that need authentication */
/** Recipients */
routes.use(checkAuth);
routes.post('/recipients', RecipientValidator.store, RecipientController.store);
routes.put(
  '/recipients/:id',
  RecipientValidator.update,
  RecipientValidator.store,
  RecipientController.update
);

/** Couriers */
routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierValidator.store, CourierController.store);
routes.put('/couriers/:id', CourierValidator.update, CourierController.update);
routes.delete(
  '/couriers/:id',
  CourierValidator.update,
  CourierController.delete
);

/** Couriers routes to manage deliveries */
routes.get('/couriers/:courier_id/parcels', (req, res) => {
  res.json({ ok: 'ok' });
});

// routes.put('/couriers/:courier_id/:parcel_id/start', CourierParcelManagement(req, res) => {
//   res.json({ ok: 'ok' });
// });

// routes.put('/couriers/:courier_id/:parcel_id/end', CourierParcelManagement(req, res) => {
//   res.json({ ok: 'ok' });
// });

// routes.put('/couriers/:courier_id/:parcel_id', (req, res) => {
//   res.json({ ok: 'ok' });
// });

/** File upload */
routes.post('/files', upload.single('file'), FileController.store);

/** Parcels */
routes.get('/parcels', ParcelController.index);
routes.post('/parcels', ParcelValidator.store, ParcelController.store);
routes.put('/parcels/:id', ParcelValidator.update, ParcelController.update);
routes.delete('/parcels/:id', ParcelValidator.del, ParcelController.delete);

export default routes;
