import { Router } from 'express';
export let router = Router();

// router.use(bodyParser.json())

router.use(require('./default').router);
// router.use(require('./admin').router)
