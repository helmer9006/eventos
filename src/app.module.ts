import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import * as Joi from 'joi';
import { environments } from './config/environments';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { LogsModule } from './logs/logs.module';
import { ConfigurationsModule } from './configurations/configurations.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EventsModule } from './events/events.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { BullModule } from '@nestjs/bull';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        SWAGGER_PASS: Joi.string().required(),
        APP_CLIENT: Joi.string().required(),
        PORT: Joi.string().required(),
        ID_ROLE_SUPERADMIN: Joi.number().required(),
        ID_ROLE_SUBSCRIBER: Joi.number().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        REDIS: Joi.string().required(),
        PORT_REDIS: Joi.number().required(),
      }),
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    LogsModule,
    ConfigurationsModule,
    MulterModule.register({
      dest: './src/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'),
      serveRoot: '/files',
    }),
    EventsModule,
    RegistrationsModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS,
        port: Number(process.env.PORT_REDIS),
      },
    }),
    BullModule.registerQueue({
      name: 'mailQueue',
    }),
    MailModule,
  ],
})
export class AppModule {}
