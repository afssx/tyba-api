import { Router } from 'express';

import auth from './auth';
import restaurants from './restaurants';

const router = Router();

router.use('/auth', auth);
router.use('/restaurants', restaurants);

export default router;
