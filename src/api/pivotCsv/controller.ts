import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";

@Service()
export class PivotCsvController {
  constructor() { }

  async transform(req: Request, res: Response, next: NextFunction) {
    try {
      console.log({ req });
        return res.json({result: 'Success' });
    } catch (e) {
        console.log(' error ', e);
        return next(e);
    }
  }
}
