import { Router } from 'express';
import requestValidation from '../../middlewares/requestValidation.js';
import {
    loginSchema,
    profileImageSchema,
    profileUpdateSchema,
    registrationSchema,
} from '../../validations/membershipValidation.js';
import authenticate from '../../middlewares/authenticate.js';
import {
    loginPost,
    profileGet,
    profileImagePut,
    profileUpdatePut,
    registrationPost,
} from '../../controllers/membershipController.js';
import fileHandler from '../../utils/fileHandler.js';

const membershipRoutes = Router();

membershipRoutes.post('/registration', requestValidation(registrationSchema), registrationPost);
membershipRoutes.post('/login', requestValidation(loginSchema), loginPost);
membershipRoutes.get('/profile', authenticate, profileGet);
membershipRoutes.put(
    '/profile/update',
    authenticate,
    requestValidation(profileUpdateSchema),
    profileUpdatePut
);
membershipRoutes.put(
    '/profile/image',
    authenticate,
    fileHandler.single('file'),
    requestValidation(profileImageSchema),
    profileImagePut
);

export default membershipRoutes;
