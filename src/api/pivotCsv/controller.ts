import { NextFunction, Request, Response } from "express";
import { PivotCsvService } from "../../services/pivotCsv";
import { Service } from "typedi";

@Service()
export class PivotCsvController {
  constructor(private readonly pivotCsvService: PivotCsvService) { }

  async transform(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file?.buffer;
      // validations for file and filename

      const input = file?.toString('utf8') || '';
      const result = await this.pivotCsvService.transformUploadedCsv(input);
      return res.status(200).json(result);
    } catch (e) {
        console.log(' error ', e);
        return next(e);
    }
  }

  async test(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('TESTT!!')
      return res.status(200).json({});
    } catch (e) {
        console.log(' error ', e);
        return next(e);
    }
  }
}
