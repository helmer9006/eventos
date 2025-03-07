import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from '../models/dto/create-event.dto';
import { UpdateEventDto } from '../models/dto/update-event.dto';
import { handleExceptions, isNumber } from '@src/shared/helpers/general';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { format, formatISO, isEqual, parseISO } from 'date-fns';
import { PaginationEventsDto } from '../models/dto/pagination-events.dto';
import { MailService } from '@src/mail/services/mail.service';
import { UsersService } from '@src/users/services/users.service';

@Injectable()
export class EventsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UsersService,
  ) {}
  async create(createEventDto: CreateEventDto, userId: number) {
    try {
      const userFound = await this.userService.findById(userId);
      if (!userFound)
        throw new BadRequestException(
          'No fue posible identificar el usuario registrado.',
        );
      const validateExist = await this.prismaService.events.findFirst({
        where: {
          title: createEventDto.title,
        },
      });
      // validate duplicate
      if (validateExist)
        throw new BadRequestException(
          'No se pudo crear el evento, ya existe un registro con el mismo título, revise los datos y vuelva a intentarlo.',
        );
      // Validate startDateTime y endDateTime not equal
      if (
        isEqual(
          parseISO(createEventDto.startDateTime),
          parseISO(createEventDto.endDateTime),
        )
      ) {
        throw new BadRequestException(
          'La fecha de inicio y fin del evento no pueden ser iguales.',
        );
      }
      const eventCreated = await this.prismaService.events.create({
        data: createEventDto,
      });
      await this.mailService.sendMail(
        userFound.email,
        'Evento Creado exitosamente',
        `Tu evento ${createEventDto.title} ha sido registrado correctamente.`,
      );
      return eventCreated;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findAll(paginationEventsDto: PaginationEventsDto) {
    try {
      const {
        limit,
        offset = 1,
        location,
        startDateTime,
        endDateTime,
      } = paginationEventsDto;

      const whereConditions: any[] = [];

      if (location) {
        whereConditions.push({
          location: { contains: location, mode: 'insensitive' },
        });
      }

      if (startDateTime || endDateTime) {
        const todayISO = formatISO(new Date());

        whereConditions.push({
          OR: [
            {
              startDateTime: {
                gte: startDateTime || todayISO,
                lte: endDateTime || todayISO,
              },
            },
            {
              endDateTime: {
                gte: startDateTime || todayISO,
                lte: endDateTime || todayISO,
              },
            },
            {
              AND: [
                { startDateTime: { lte: startDateTime || todayISO } },
                { endDateTime: { gte: endDateTime || todayISO } },
              ],
            },
          ],
        });
      }

      const [count, events] = await this.prismaService.$transaction([
        this.prismaService.events.count({ where: { AND: whereConditions } }),
        this.prismaService.events.findMany({
          where: { AND: whereConditions },
          take: limit || undefined,
          skip: limit ? (offset - 1) * limit : undefined,
          orderBy: { title: 'asc' },
        }),
      ]);

      return { count, events };
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findById(id: number) {
    try {
      return await this.eventExists(id);
    } catch (error) {
      handleExceptions(error);
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto, userId: number) {
    try {
      const eventFound = await this.eventExists(id);
      const userFound = await this.userService.findById(userId);
      if (!userFound)
        return await this.prismaService.events.update({
          where: { id },
          data: updateEventDto,
        });
      await this.mailService.sendMail(
        userFound.email,
        'Evento actualizado exitosamente',
        `Tu evento ${eventFound.title} ha sido actualizado correctamente.`,
      );
    } catch (error) {
      handleExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      await this.eventExists(id);
      return await this.prismaService.events.delete({ where: { id } });
    } catch (error) {
      handleExceptions(error);
    }
  }

  async eventExists(id: number) {
    const event = await this.prismaService.events.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException(`No se encontró el evento.`);
    }

    return event;
  }
}
