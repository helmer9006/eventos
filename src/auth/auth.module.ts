import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', JwtStrategy }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '8h' },
        };
      },
    }),
  ],
  providers: [JwtStrategy, PrismaService, AuthService],
  exports: [JwtStrategy, PassportModule, JwtModule, PrismaService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
