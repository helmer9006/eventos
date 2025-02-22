import { Test, TestingModule } from '@nestjs/testing';

import { BadRequestException } from '@nestjs/common';
import { RolesEnum } from '../src/auth/enums/roles.enum';
import { EventsService } from '@src/events/services/events.service';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { MailService } from '@src/mail/services/mail.service';
import { UsersService } from '@src/users/services/users.service';
import { CreateEventDto } from '@src/events/models/dto/create-event.dto';

describe('EventsService', () => {
  let service: EventsService;
  let prismaService: PrismaService;
  let mailService: MailService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: PrismaService,
          useValue: {
            events: {
              findFirst: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: MailService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    prismaService = module.get<PrismaService>(PrismaService);
    mailService = module.get<MailService>(MailService);
    userService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('🔹 debe crear un evento exitosamente', async () => {
    const userId = 1;
    const createEventDto: CreateEventDto = {
      title: 'Evento Test',
      startDateTime: '2025-02-22T14:30:00Z',
      endDateTime: '2025-02-22T16:30:00Z',
      description: 'evento test',
      location: 'piso 4',
    };

    const mockUser = {
      name: 'Luisa',
      lastname: 'Ruiz',
      identifictionType: 'CC',
      identiication: '222222',
      email: 'test@gmail.com',
      pssword: 'cGFzc3dvcmQ=',
      phone: '3013555186',
      roleId: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockEvent = { id: 1, ...createEventDto };

    // Mocks para las funciones dependientes
    jest.spyOn(userService, 'findById').mockResolvedValue(mockUser);
    jest.spyOn(prismaService.events, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prismaService.events, 'create').mockResolvedValue(mockEvent);
    jest
      .spyOn(mailService, 'sendMail')
      .mockResolvedValue({ message: 'Correo enviado' });

    const result = await service.create(createEventDto, userId);

    expect(userService.findById).toHaveBeenCalledWith(userId);
    expect(prismaService.events.findFirst).toHaveBeenCalledWith({
      where: { title: createEventDto.title },
    });
    expect(prismaService.events.create).toHaveBeenCalledWith({
      data: createEventDto,
    });
    expect(mailService.sendMail).toHaveBeenCalledWith(
      mockUser.email,
      'Evento Creado exitosamente',
      `Tu evento ${createEventDto.title} ha sido registrado correctamente.`,
    );
    expect(result).toEqual(mockEvent);
  });

  it('🚨 debe lanzar un error si el usuario no existe', async () => {
    const userId = 1;
    const createEventDto: CreateEventDto = {
      title: '  Reunión daily cuatro tres',
      description: 'Reunión díaria en las mañanas',
      location: 'Salon cusiana 3',
      startDateTime: '2024-02-20T10:30:00Z',
      endDateTime: '2024-01-20T20:00:00Z',
    };

    jest.spyOn(userService, 'findById').mockResolvedValue(null);

    await expect(service.create(createEventDto, userId)).rejects.toThrow(
      new BadRequestException(
        'No fue posible identificar el usuario registrado.',
      ),
    );
  });
});
