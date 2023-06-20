import { JWT_BEARER } from '@app/app.interface';
import { JwtAuthGuard } from '@app/modules/authentication/guards/jwt-auth.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const Auth = () => applyDecorators(ApiBearerAuth(JWT_BEARER), UseGuards(JwtAuthGuard));
