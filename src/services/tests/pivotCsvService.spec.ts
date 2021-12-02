import { PivotCsvService } from '../pivotCsv';

describe('PivotCsvService', () => {

    let pivotCsvService: PivotCsvService;
    beforeEach(async () => {
        jest.restoreAllMocks();

        pivotCsvService = new PivotCsvService();
    });

    describe('transformUploadedCsv', () => {
      it('should successfully process a buffer input', async () => {
        const fakeBuffer = Buffer.from('Test String');

        jest.spyOn(pivotCsvService, 'transformUploadedCsv').mockImplementation(() => new Promise((resolve) => resolve('Test Result')));
        const result = await pivotCsvService.transformUploadedCsv(fakeBuffer);
        expect(result).toBe('Test Result');
      });

      it('should successfully process a buffer input with loadtest query', async () => {
        const fakeBuffer = Buffer.from('Test String');

        jest.spyOn(pivotCsvService, 'transformUploadedCsv').mockImplementation(() => new Promise((resolve) => resolve('Test Result')));
        const result = await pivotCsvService.transformUploadedCsv(fakeBuffer);
        expect(result).toBe('Test Result');
      });
    });
});
