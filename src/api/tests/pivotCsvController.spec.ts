import { Request, Response } from 'express';
jest.mock('../../services/pivotCsv');
import PivotCsvService from '../../services/pivotCsv';
import { PivotCsvController } from '../pivotCsv/controller';


describe('PivotCsv Controller', () => {
  let controller: PivotCsvController;
  const PivotCsvServiceMock = <jest.Mock<PivotCsvService>>PivotCsvService;
  let pivotCsvService = new PivotCsvServiceMock();

  beforeEach(async () => {
    controller = new PivotCsvController(pivotCsvService);
  });

  it('should throw 400 error if buffer is undefined', async () => {
    jest.spyOn(pivotCsvService, 'transformUploadedCsv').mockImplementation();
    const mReq = { file: { buffer: undefined } } as unknown as Request;
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() } as unknown as Response;
    const mNext = jest.fn();
    await controller.transform(mReq, mRes, mNext);
    expect(mRes.json).toBeCalledWith({ error: 'Please provide a csv file' });
    expect(pivotCsvService.transformUploadedCsv).not.toBeCalled();
    expect(mRes.status).toBeCalledWith(400);
  });

  it('should throw error if pivotService fails', async () => {
    jest.spyOn(pivotCsvService, 'transformUploadedCsv').mockRejectedValue({error: 'Error'});
    const mReq = { file: { buffer: Buffer.from('CSV-STRING') } } as unknown as Request;
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() } as unknown as Response;
    const mNext = jest.fn();
    await controller.transform(mReq, mRes, mNext);
    expect(pivotCsvService.transformUploadedCsv).toBeCalled();
    expect(mNext).toBeCalled();
  });

  it('should run successfully, and call transformUploadedCsv to process', async () => {
    jest.spyOn(pivotCsvService, 'transformUploadedCsv').mockResolvedValue('Success');
    const mReq = { file: { buffer: Buffer.from('Test-String') } } as unknown as Request;
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() } as unknown as Response;
    const mNext = jest.fn();
    await controller.transform(mReq, mRes, mNext);
    expect(mRes.json).toBeCalledWith('Success');
    expect(pivotCsvService.transformUploadedCsv).toBeCalled();
    expect(mRes.status).toBeCalledWith(200);
  });

});