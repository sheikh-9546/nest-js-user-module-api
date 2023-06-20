import { UsersService } from '@app/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService, configService: ConfigService) {
        super({
            ignoreExpiration: true,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('jwt.secret'),
        });
    }

    public async validate(payload: any) {
        const foundedIdentity = await this.userService.findOne(payload.uuid);
        if (!foundedIdentity) {
            throw new UnauthorizedException({ message: 'You are not authorized to perform the operation' });
        }

        return foundedIdentity;
    }
}
