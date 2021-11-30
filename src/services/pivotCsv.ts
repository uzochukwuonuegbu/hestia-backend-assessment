import path from 'path';
import { Service } from 'typedi';
import { pythonPromise } from './utils';

@Service()
export class PivotCsvService {
    constructor() {}

    public async transformUploadedCsv(inputString: string, query: any) {
        let stringOrFilepath = inputString;
        let loadtest = 'FALSE';
        try {
            const pythonFile = path.join(__dirname, '../../pivotCsv.py')
            
            // hack to handle loadtests
            if (query?.loadtest === 'true') {
                stringOrFilepath = path.join(__dirname, '../../sample.csv');
                loadtest = 'TRUE';
            }
            const dataFromPython = await pythonPromise(pythonFile, [stringOrFilepath, loadtest]);
            return dataFromPython;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
