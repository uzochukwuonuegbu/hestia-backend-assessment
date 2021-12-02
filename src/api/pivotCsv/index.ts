import 'reflect-metadata';

import { Router } from 'express';
import { Container } from 'typedi';
import { PivotCsvController } from './controller';
import multer  from 'multer';
const storage = multer.memoryStorage();

// Validation for csv format
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .csv format allowed!'));
    }
  }
});

const route = Router();

export default (app: Router) => {
  app.use('/pivot-csv', route);

  const pivotCsvController = Container.get(PivotCsvController);

  route.post('/transform', upload.single('file'), (req, res, next) => pivotCsvController.transform(req, res, next));
};
