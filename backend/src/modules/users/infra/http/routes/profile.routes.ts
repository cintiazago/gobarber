import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/', profileController.show);
profileRoutes.put('/', profileController.update);

export default profileRoutes;
