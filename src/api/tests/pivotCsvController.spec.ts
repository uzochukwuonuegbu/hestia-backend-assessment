import Container from 'typedi';
import { PivotCsvController } from '../pivotCsv/controller';

describe('PivotCsv Controller', () => {
  let controller: PivotCsvController;
  beforeEach(async () => {

    controller = Container.get(PivotCsvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});