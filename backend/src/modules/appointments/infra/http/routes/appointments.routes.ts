import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appoitmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.post('/', appointmentsController.create);

export default appoitmentsRouter;
