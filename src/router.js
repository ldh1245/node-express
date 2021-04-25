import { Router } from 'express';
import v1ApiRouter from './api/v1';

const router = Router();

router.get('/', (req, res) => res.send('Hello, world.'));

router.get('/test', (req, res) => Promise.reject());

router.use('/v1', v1ApiRouter);

export default router;
