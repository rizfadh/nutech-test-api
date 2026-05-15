import { Router } from 'express';
import { bannersGet, servicesGet } from '../../controllers/informationController.js';
import authenticate from '../../middlewares/authenticate.js';

const informationRoutes = Router();

informationRoutes.get('/banner', bannersGet);
informationRoutes.get('/service', authenticate, servicesGet);

export default informationRoutes;
