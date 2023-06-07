import basicAuth from 'express-basic-auth';

export const basicAuthConfig = (): any => {
    return basicAuth({
        challenge: true,
        users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASS },
    });
};
