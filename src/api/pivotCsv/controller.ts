import { NextFunction, Request, Response } from "express";
import { PivotCsvService } from "../../services/pivotCsv";
import { Service } from "typedi";

@Service()
export class PivotCsvController {
  constructor(private readonly pivotCsvService: PivotCsvService) { }

  async transform(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req;
      const file = req.file?.buffer;

      const input = file || '';
      const result = await this.pivotCsvService.transformUploadedCsv(input, query);
      return res.status(200).json(result);
    } catch (e) {
        console.log(' error ', e);
        return next(e);
    }
  }
}
