import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { Service } from 'typedi';
import { pythonPromise, streamToString } from './utils';

@Service()
export class PivotCsvService {
    constructor() {}

    public async transformUploadedCsv(buffer: Buffer | string, query: any): Promise<any> {
        try {
            const pythonFile = path.join(__dirname, '../../pivotCsv.py')
            
            // hack to handle loadtests
            if (query?.loadtest === 'true') {
                const sampleFile = path.join(__dirname, '../../sample.csv');

                const readableStream = fs.createReadStream(sampleFile);
                return streamToString(readableStream, async (data: any) => {
                    return await pythonPromise(pythonFile, [data]);
                });
            }
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
