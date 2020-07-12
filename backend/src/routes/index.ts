// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appoitments', appointmentsRouter);

export default routes;
