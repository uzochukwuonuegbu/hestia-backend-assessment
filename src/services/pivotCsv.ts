import path from 'path';
import { Service } from 'typedi';
import { pythonPromise, writeFileToRootSync, deleteFileFromRoot } from './utils';

@Service()
export class PivotCsvService {
    constructor() {}

    public async transformUploadedCsv(tmpFile: string, inputString: string) {
        try {
            writeFileToRootSync(tmpFile, inputString);
            const pythonFile = path.join(__dirname, '../../pivotCsv.py')
            const dataFromPython = await pythonPromise(pythonFile, [tmpFile, inputString]);
            deleteFileFromRoot(tmpFile);
            return dataFromPython;
        } catch (error) {
            console.log(error);
            deleteFileFromRoot(tmpFile);
            throw error;
        }
    }
}
