import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from '../models/dto/create-registration.dto';
import { UpdateRegistrationDto } from '../models/dto/update-registration.dto';
import { handleExceptions } from '@src/shared/helpers/general';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { UsersService } from '@src/users/services/users.service';
import { EventsService } from '../../events/services/events.service';
import { formatISO, isAfter, parseISO } from 'date-fns';
import { PaginationDto } from '@src/shared/models/dto/pagination.dto';
import { RolesEnum } from '@src/auth/enums/roles.enum';

@Injectable()
export class RegistrationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
    private readonly eventsService: EventsService,
  ) {}
  async createRegistrations(eventId: number, userId: number) {
    try {
      const userFound = await this.userService.findById(userId);
      const eventFound = await this.eventsService.findById(eventId);

      const deplicateRegistration =
        await this.prismaService.registrations.findFirst({
          where: {
            userId,
            eventId,
          },
        });
      if (deplicateRegistration)
        throw new BadRequestException(
          `El usuario ${userFound.name} ya se encuentra registrado al evento ${eventFound.title}.`,
        );
      const todayUTC = new Date(); // Get today utc
      if (isAfter(todayUTC, parseISO(eventFound.startDateTime))) {
        throw new BadRequestException(
          'No se pudo realizar el registro, el evento no se encuentra activo.',
        );
      }
      return await this.prismaService.registrations.create({
        data: {
          userId,
          eventId,
        },
      });
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto, roleId: number, userId: number) {
    try {
      console.log('roleId', roleId);
      console.log('userId', userId);
      const where = roleId === RolesEnum.SUPERADMIN ? {} : { userId: userId };
      console.log('where', where);
      const { limit, offset = 1 } = paginationDto;

      const [count, registrations] = await this.prismaService.$transaction([
        this.prismaService.registrations.count({
          where,
          take: limit || undefined,
          skip: limit ? (offset - 1) * limit : undefined,
        }),
        this.prismaService.registrations.findMany({
          where,
          take: limit || undefined,
          skip: limit ? (offset - 1) * limit : undefined,
          include: {
            User: true,
            Event: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
      ]);

      return { count, registrations };
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      const regFound = await this.prismaService.registrations.findUnique({
        where: { id },
      });
      if (!regFound)
        throw new BadRequestException(
          'No se encontró el registro de la inscripción.',
        );
      return regFound;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async cancelRegistration(
    registrationId: number,
    userId: number,
    roleId: number,
  ) {
    try {
      const regFound = await this.prismaService.registrations.findUnique({
        where: { id: registrationId },
      });
      if (!regFound)
        throw new BadRequestException(
          'No se pudo cancelar la inscripción al evento, no se encontró el registro a cancelar.',
        );
      if (roleId === RolesEnum.SUBSCRIBER && regFound.userId !== userId)
        throw new BadRequestException(
          'No se pudo cancelar la inscripción al evento, no puedes cancelar subscripciones de otros usuarios.',
        );
      return await this.prismaService.registrations.update({
        where: { id: registrationId },
        data: { wasCanceled: true },
      });
    } catch (error) {
      handleExceptions(error);
    }
  }
}
