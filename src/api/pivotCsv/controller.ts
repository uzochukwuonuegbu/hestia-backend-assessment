import { NextFunction, Request, Response } from "express";
import PivotCsvService from "../../services/pivotCsv";
import { Service } from "typedi";

@Service()
export class PivotCsvController {
  constructor(private readonly pivotCsvService: PivotCsvService) { }

  async transform(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file?.buffer;
      if (!file) {
        return res.status(400).json({ error: 'Please provide a csv file' });
      }
      const result = await this.pivotCsvService.transformUploadedCsv(file);
      return res.status(200).json(result);
    } catch (e) {
        console.log(' error ', e);
        return next(e);
    }
  }
}
