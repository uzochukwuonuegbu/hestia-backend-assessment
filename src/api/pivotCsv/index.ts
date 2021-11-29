import 'reflect-metadata';

import { Router } from 'express';
import { Container } from 'typedi';
import { PivotCsvController } from './controller';
import multer  from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const route = Router();

export default (app: Router) => {
  app.use('/pivot-csv', route);

  const pivotCsvController = Container.get(PivotCsvController);

  route.post('/transform', upload.single('file'), (req, res, next) => pivotCsvController.transform(req, res, next));
  route.get('/', (req, res, next) => pivotCsvController.test(req, res, next));
};
