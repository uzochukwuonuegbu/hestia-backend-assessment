import { Router } from 'express';
import pivotCsv from './pivotCsv';

const router = Router();
pivotCsv(router);

export default router;