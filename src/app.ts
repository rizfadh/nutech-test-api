import express from 'express';
import helmet from 'helmet';
import path from 'path';
import errorHandler from './middlewares/errorHandler.js';
import modelSync from './models/modelSync.js';
import membershipRoutes from './routes/v1/membershipRoutes.js';
import informationRoutes from './routes/v1/informationRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

modelSync();

app.use('/', express.static(path.join(process.cwd(), 'uploads/images')));
app.use('/api/v1/membership', membershipRoutes);
app.use('/api/v1/information', informationRoutes);

app.use(errorHandler());

export default app;
