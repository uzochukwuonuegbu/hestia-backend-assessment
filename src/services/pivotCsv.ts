import { Service } from 'typedi';

@Service()
export class PivotCsvService {
    constructor() {}

    public async transformUploadedCsv(): Promise<any[]> {
        try {
            return ['xxx', 'xx1', 'xx2'];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}