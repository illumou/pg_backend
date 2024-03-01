import { Router } from 'express';
import authRouter from './authentication/index.js'
import dataRouter from './data/index.js'
import {middleware} from "../utils/middleware.js";

const router = Router();

//router.use(middleware);

router.use('/data',             dataRouter)
router.use('/authentication',   authRouter)

export default router;
