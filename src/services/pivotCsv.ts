import path from 'path';
import { Readable } from 'stream';
import { Service } from 'typedi';
import { pythonPromise, streamToString } from './utils';

@Service()
export default class PivotCsvService {
    constructor() {}

    public async transformUploadedCsv(buffer: Buffer): Promise<string> {
        try {
            const pythonFile = path.join(__dirname, '../../pivotCsv.py')
            const stream = Readable.from(buffer.toString());
            return streamToString(stream, async (data: any) => {
                return await pythonPromise(pythonFile, [data]);
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
