import { Router } from 'express';

import { search, transactions } from 'controllers/restaurants';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.get('/', [checkJwt], transactions);

router.get('/search', [checkJwt], search);

export default router;
