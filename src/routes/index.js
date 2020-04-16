import { Router } from 'express';

import sessionRoutes from './Session';
import sessionCourierRoutes from './SessionCourier';
import recipientRoutes from './Recipient';
import courierRoutes from './Courier';
import parcelRoutes from './Parcel';
import fileRoutes from './File';
import parcelProblemsRoutes from './ParcelProblem';

import courierDeliveries from './CourierManagementParcels';

const routes = Router();

routes.use(sessionRoutes);
routes.use(sessionCourierRoutes);
routes.use(fileRoutes);
routes.use(courierDeliveries);

routes.use(parcelProblemsRoutes);

/* routes that require authentication */
routes.use(recipientRoutes);
routes.use(parcelRoutes);
routes.use(courierRoutes);

export default routes;
