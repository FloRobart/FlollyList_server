import express from 'express';
import { Request } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'node:fs';
import path from 'node:path';
import AppConfig from './config/AppConfig';
import { errorHandler } from './core/middlewares/error.middleware';
import { helmetOptions } from './core/middlewares/helmet_http_headers.middleware';
import { limiter } from './core/middlewares/rate_limiter.middleware';
import { defaultRouteHandler } from './core/middlewares/default_route.middleware';
import { authorizationValidator } from './core/middlewares/validators/auth_validator.middleware';
import peoplesRoutes from './modules/peoples/peoples.routes';
import giftsRoutes from './modules/gifts/gifts.routes';



const app = express();



/* Cross Origin Resource Sharing (CORS) */
app.use(cors(AppConfig.corsOptions));

/* Security headers (Helmet) */
app.use(helmet(helmetOptions));

/* Trust proxy in production */
if (AppConfig.app_env.includes('prod')) {
    app.set('trust proxy', 1);
}

/* Rate Limiter */
app.use(limiter);

/* Body parser */
app.use(express.json());

/* Health Check */
app.get('/', (_req, res) => { res.status(200).send('HEALTH CHECK') });

/* Favicon */
app.get("/favicon.ico", (_req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "icons", "favicon.ico"));
});

/* Static public files */
app.use(express.static(path.join(process.cwd(), "public")));

/* Swagger setup for API documentation in development environment */
if (AppConfig.app_env.includes('dev')) {
    const swaggerUi = require('swagger-ui-express');
    const swaggerJsDoc = require('swagger-jsdoc');
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: AppConfig.app_name,
                version: packageJson.version,
                description: `${AppConfig.app_name} documentation`,
            },
        },
        apis: [
            `${__dirname}/modules/**/*.ts`,
            `${__dirname}/modules/**/*.js`,
            `${__dirname}/swagger/**/*.ts`,
            `${__dirname}/swagger/**/*.js`,
        ],
    };

    const swaggerUiOptions = {
        explorer: false,
        swaggerOptions: {
            deepLinking: false,
        },
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', morgan(AppConfig.log_format), swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));
    app.get('/api-docs.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocs);
    });
}


/* Authentication Middleware */
app.use(authorizationValidator);


/* Logger: the ID of the user rather than its email, which has nothing to do in the logs */
morgan.token("remote-user", (req: Request) => {
    const userId = req.body?.user?.id;
    return userId ? `user-${userId}` : "Unknown User";
});
app.use(morgan(AppConfig.log_format));


/* People routes */
app.use('/peoples', peoplesRoutes);

/* Gifts routes */
app.use('/gifts', giftsRoutes);


/* Default Route Handler (404) */
app.use(defaultRouteHandler);

/* Error Handler */
app.use(errorHandler);



export default app;
