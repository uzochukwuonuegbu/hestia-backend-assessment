import 'reflect-metadata';

import { Router } from 'express';
import { Container } from 'typedi';
import { PivotCsvController } from './controller';
const route = Router();

export default (app: Router) => {
  app.use('/pivot-csv', route);

  const pivotCsvController = Container.get(PivotCsvController);

  route.post('/transform', (req, res, next) => pivotCsvController.transform(req, res, next));
};
