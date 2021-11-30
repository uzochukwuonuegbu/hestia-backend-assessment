import fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import routes from '../api';

export default (app: express.Application) => {
    app.enable('trust proxy');
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // set up swagger docs
    const swaggerFile = (process.cwd() + "/src/api/swagger/swagger.json");
    const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(JSON.parse(swaggerData)));

    app.use('/', routes);

    /// catch 404 and forward to error handler
    app.use((_req, _res, next) => {
    const error: Error = new Error('Not Found');
    next(error);
    });

    /// error handlers
    app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
        return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
    });

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
        errors: {
        message: err.message,
        },
    });
    });
};