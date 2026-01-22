import express from 'express';
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import * as logger from './core/utils/logger';
import { errorHandler } from './core/middlewares/error.middleware';
import { helmetOptions } from './core/middlewares/helmet_http_headers.middleware';
import { limiter } from './core/middlewares/rate_limiter.middleware';
import { authorizationValidator } from './core/middlewares/validators/auth_validator.middleware';
import { defaultRouteHandler } from './core/middlewares/default_route.middleware';
import giftsRoutes from './modules/gifts/gifts.routes';
import peoplesRoutes from './modules/peoples/peoples.routes';
import AppConfig from './config/AppConfig';



const app = express();



/* Cross Origin Resource Sharing (CORS) */
app.use(cors(AppConfig.corsOptions));

/* Security headers (Helmet) */
app.use(helmet(helmetOptions));

/* Trust proxy in production */
if (AppConfig.app_env.includes('prod')) {
    app.set('trust proxy', true);
}

/* Rate Limiter */
app.use(limiter);

/* Body parser */
app.use(express.json());

/* Health Check */
app.get('/', (_req, res) => { res.status(200).send('HEALTH CHECK') });

/* Favicon */
app.get("/favicon.ico", (_req, res) => {
    res.sendFile(path.join(__dirname, "../public/favicon.ico"));
});


/* Swagger setup for API documentation in development environment */
if (AppConfig.app_env.includes('dev')) {
    const swaggerUi = require('swagger-ui-express');
    const swaggerJsDoc = require('swagger-jsdoc');
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: AppConfig.app_env,
                version: packageJson.version,
                description: `${AppConfig.app_env} documentation`,
            },
        },
        apis: [`${__dirname}/modules/**/*.ts`, `${__dirname}/modules/**/*.js`],
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', morgan(config.log));
    app.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.get('/api-docs.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocs);
    });
}


/* Authentication Middleware */
app.use(authorizationValidator);

/* Logger */
morgan.token("remote-user", (req: Request) => { return req.body.user.email || "Unknown User" });
app.use(morgan(AppConfig.log_format));

/* Gifts routes */
app.use('/gifts', giftsRoutes);

/* People routes */
app.use('/peoples', peoplesRoutes);


/* Default Route Handler (404) */
app.use(defaultRouteHandler);

/* Error Handler */
app.use(errorHandler);



export default app;
