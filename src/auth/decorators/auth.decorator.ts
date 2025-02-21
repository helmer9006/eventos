import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesEnum } from '../enums/roles.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
export function Auth(...roles: RolesEnum[]) {
  return applyDecorators(
    // UseGuards(JwtAuthGuard)
    Roles(...roles),
    UseGuards(AuthGuard('jwt'), JwtAuthGuard),
  );
}
