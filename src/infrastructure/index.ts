import 'reflect-metadata';

import * as express from 'express';
import server from './server';


export const setupServer = (app: express.Application) => {
    server(app);
    console.log('Server loaded!');
};