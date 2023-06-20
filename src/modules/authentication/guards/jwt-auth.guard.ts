import { JWT_AUTH_GUARD } from '@app/app.interface';
import { UnauthorizedAccessException } from '@app/exceptions/oauth/unauthorized-access.exception';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_AUTH_GUARD) {
    public override handleRequest(err: any, user: any, info: any, context: any, status: any) {
        if (!user) {
            throw new UnauthorizedAccessException('Unauthorized');
        }

        return super.handleRequest(err, user, info, context, status);
    }
}
