import { Router } from 'express';
import { bannersGet, servicesGet } from '../../controllers/informationController.js';

const informationRoutes = Router();

informationRoutes.get('/banner', bannersGet);
informationRoutes.get('/service', servicesGet);

export default informationRoutes;
