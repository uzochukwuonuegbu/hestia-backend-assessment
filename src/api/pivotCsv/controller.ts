import { NextFunction, Request, Response } from "express";
import { PivotCsvService } from "pd/services/pivotCsv";
import { Service } from "typedi";

@Service()
export class PivotCsvController {
  constructor(private readonly pivotCsvService: PivotCsvService) { }

  async transform(req: Request, res: Response, next: NextFunction) {
    try {
      console.log({ req });
      const result = await this.pivotCsvService.transformUploadedCsv();
      return res.json({ result });
    } catch (e) {
        console.log(' error ', e);
        return next(e);
    }
  }
}
