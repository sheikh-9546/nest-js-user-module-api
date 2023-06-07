import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { setSwaggerSetup } from './swagger.config';

export function applyAppMiddleware(app: NestExpressApplication): NestExpressApplication {
    const isProduction = process.env.NODE_ENV === 'production';
    app.enableCors();
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
        .set('trust proxy', 1)
        .use(
            helmet({
                contentSecurityPolicy: isProduction ? undefined : false,
                crossOriginEmbedderPolicy: isProduction ? undefined : false,
            }),
        );
    setSwaggerSetup(app);

    return app;
}