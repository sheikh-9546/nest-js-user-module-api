import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { toLower } from 'lodash';
import { basicAuthConfig } from './config/basic-auth.config';
import { JWT_BEARER } from './app.interface';

const statusIndicator: Record<string, string> = {
    local: '.swagger-ui .topbar { background-color: #22c55e; }', // green
    qa: '.swagger-ui .topbar { background-color: #eab308; }', // yellow
    development: '.swagger-ui .topbar { background-color: #3b82f6; }', // blue
    production: '.swagger-ui .topbar { background-color: #dc2626; }', // red
};

export const setSwaggerSetup = (app: NestExpressApplication) => {
    const docs = SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
            .setTitle(`Form Insurance API Documentation [${process.env.STAGE}]`)
            .setDescription(`Documentation`)
            .setVersion('1.0.0')
            .addTag('Auth', 'authentication endpoints')
            .addServer(process.env.SWAGGER_HOST, process.env.STAGE)
            .addBearerAuth({ type: 'http', scheme: JWT_BEARER, bearerFormat: JWT_BEARER }, JWT_BEARER)
            .build(),
    );

    app.use('/docs', basicAuthConfig());

    SwaggerModule.setup('/docs', app, docs, {
        customSiteTitle: `${process.env.SERVER_NAME} | API Documentation`,
        customCss: statusIndicator[toLower(process.env.STAGE)] ?? '.swagger-ui .topbar { background-color: black; }',
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
};
