import { ApiProperty } from '@nestjs/swagger';

export const SW_RESPONSES = {
  errorServerResponse: {
    description: `Error de servidor.`,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {},
            },
            statusCode: { type: 'number', example: 500 },
            message: { type: 'string', example: 'Error de servidor' },
          },
        },
      },
    },
  },

  unauthorizedResponse: {
    description: `Falta de privilegios.`,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: { type: 'object', example: {} },
            statusCode: { type: 'number', example: 401 },
            message: {
              type: 'string',
              example: 'No tiene permisos necesario para acceder al recurso.',
            },
          },
        },
      },
    },
  },

  conflictRoleResponse: {
    description: `Respuesta para roles duplicados.`,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: { type: 'object', example: {} },
            statusCode: { type: 'number', example: 409 },
            message: {
              type: 'string',
              example: 'El rol ya se encuentra registrado',
            },
          },
        },
      },
    },
  },

  listRolesResponse: {
    description: 'Lista de roles',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              example: [
                {
                  id: 1,
                  name: 'superadministrador',
                  description: '',
                  isActive: true,
                  createdAt: '2024-03-20T05:07:30.082Z',
                  updatedAt: '2024-03-20T05:07:30.082Z',
                },
              ],
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Roles encontrados.' },
          },
        },
      },
    },
  },

  createUserOkResponse: {
    description: 'Respuesta exitosa creación de usuario.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                id: 1,
                name: 'HELMER',
                lastname: 'VILLARREAL LARIOS',
                identificationType: 'CC',
                identification: '1051635340',
                email: 'helmervillarreal@gmail.com',
                phone: ' 3013555186',
                isActive: true,
                roleId: 1,
                createdAt: '2024-03-20T05:11:45.521Z',
                roles: {
                  id: 1,
                  name: 'superadministrador',
                  description: '',
                  isActive: true,
                  createdAt: '2024-03-20T05:07:30.082Z',
                  updatedAt: '2024-03-20T05:07:30.082Z',
                },
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Usuario creado correctamente.',
            },
          },
        },
      },
    },
  },

  createUserUnauthorizeResponse: {
    description: `Usuario no creado por falta de privilegios.`,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {},
            statusCode: { type: 'number', example: 401 },
            message: {
              type: 'string',
              example: 'No tiene permisos necesario para acceder al recurso.',
            },
          },
        },
      },
    },
  },

  userConflictResponse: {
    description: `Respuesta para usuarios duplicados por identificación o correo.`,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {},
            statusCode: { type: 'number', example: 409 },
            message: {
              type: 'string',
              example: 'El usuario ya se encuentra registrado.',
            },
          },
        },
      },
    },
  },

  getUserOkResponse: {
    description: 'Respuesta exitosa consulta de usuarios.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                count: 1,
                users: [
                  {
                    id: 1,
                    name: 'HELMER',
                    lastname: 'VILLARREAL LARIOS',
                    identificationType: 'CC',
                    identification: '1051635340',
                    email: 'helmervillarreal@gmail.com',
                    phone: ' 3013555186',
                    isActive: true,
                    roleId: 1,
                    createdAt: '2024-03-20T05:11:45.521Z',
                    roles: {
                      id: 1,
                      name: 'superadministrador',
                      description: '',
                      isActive: true,
                      createdAt: '2024-03-20T05:07:30.082Z',
                      updatedAt: '2024-03-20T05:07:30.082Z',
                    },
                  },
                ],
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Usuarios encontrados.' },
          },
        },
      },
    },
  },

  getTermUserOkResponse: {
    description:
      'Respuesta consulta de usuario por identificación, nombre o aliado.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              example: [
                {
                  id: 6,
                  uid: '4bec7c83-79a3-41a1-b761-84a737567708',
                  name: 'Helmer',
                  lastname: 'Villarreal ',
                  identificationType: 'CC',
                  identification: '1051635340',
                  email: 'helmer90@outlook.com',
                  address: 'cra e3',
                  phone: '32015151',
                  isActive: true,
                  roleId: 2,
                  supervisorId: null,
                  advisorStartDate: null,
                  advisorEndDate: null,
                  createdAt: '2023-07-21T18:35:22.315Z',
                  updatedAt: '2023-07-21T18:33:00.000Z',
                  roles: {
                    id: 2,
                    name: 'superadministrador',
                    description: null,
                    isActive: true,
                    createdAt: '2023-07-21T18:27:04.982Z',
                    updatedAt: '2023-07-21T18:25:43.177Z',
                  },
                  supervisor: null,
                },
              ],
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Usuario encontrado.' },
          },
        },
      },
    },
  },

  getMailUserOkResponse: {
    description: 'Respuesta consulta de usuario por correo.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                id: 6,
                uid: '4bec7c83-79a3-41a1-b761-84a737567708',
                name: 'Helmer',
                lastname: 'Villarreal ',
                identificationType: 'CC',
                identification: '1051635340',
                email: 'helmer90@outlook.com',
                phone: '32015151',
                isActive: true,
                roleId: 2,
                createdAt: '2023-07-21T18:35:22.315Z',
                updatedAt: '2023-07-21T18:33:00.000Z',
                roles: {
                  id: 2,
                  name: 'superadministrador',
                  isActive: true,
                  createdAt: '2023-07-21T18:27:04.982Z',
                  updatedAt: '2023-07-21T18:25:43.177Z',
                },
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Usuario encontrado.' },
          },
        },
      },
    },
  },

  updateUserNotFoundResponse: {
    description: `Respuesta para usuario no actualizado.`,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {},
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example: 'El usuario no pudo ser actualizado.',
            },
          },
        },
      },
    },
  },

  updateUserOkResponse: {
    description: 'Respuesta exitosa actualización de usuario.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                id: 1,
                name: 'HELMER',
                lastname: 'VILLARREAL LARIOS',
                identificationType: 'CC',
                identification: '1051635340',
                email: 'helmervillarreal@gmail.com',
                phone: ' 3013555186',
                isActive: true,
                roleId: 1,
                createdAt: '2024-03-20T05:11:45.521Z',
                updatedAt: '2024-03-21T18:51:39.377Z',
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Usuario actualizado correctamente.',
            },
          },
        },
      },
    },
  },

  getPermissionsOkResponse: {
    description: 'Respuesta consulta de permisos.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              example: [
                {
                  id: 7,
                  description: 'Crear producto',
                  path: '/products/create',
                  createdAt: '2023-07-15T16:53:41.271Z',
                  updatedAt: '2023-07-15T22:36:00.000Z',
                  code: 'PRO001',
                  moduleId: 2,
                  isActive: true,
                },
              ],
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Lista de Permisos.' },
          },
        },
      },
    },
  },

  getByRolPermissionsOkResponse: {
    description: 'Respuesta consulta de permisos por rol.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              example: [
                {
                  id: 1,
                  description: 'Crear usuario',
                  path: '/users/create',
                  createdAt: '2023-07-05T22:36:45.559Z',
                  updatedAt: '2023-07-05T22:36:00.000Z',
                  code: 'USER001',
                  moduleId: 1,
                  isActive: true,
                  rolesPermission: [
                    {
                      id: 1,
                      roleId: 1,
                      permissionId: 1,
                      createdAt: '2023-07-05T23:14:33.698Z',
                      updatedAt: '2023-07-05T23:14:00.000Z',
                    },
                  ],
                },
              ],
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Lista de Permisos.' },
          },
        },
      },
    },
  },

  getByRoleIdUserOkResponse: {
    description: 'Respuesta exitosa consulta de usuarios por id de rol.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              example: [
                {
                  name: 'HELMER',
                  lastname: 'VILLARREAL LARIOS',
                  identificationType: 'CC',
                  identification: '1051635340',
                  email: 'helmervillarreal@gmail.com',
                  phone: ' 3013555186',
                  isActive: true,
                  roleId: 1,
                  createdAt: '2024-03-20T05:11:45.521Z',
                  roles: {
                    id: 1,
                    name: 'superadministrador',
                    description: '',
                    isActive: true,
                    createdAt: '2024-03-20T05:07:30.082Z',
                    updatedAt: '2024-03-20T05:07:30.082Z',
                  },
                },
                {
                  name: 'JUAN',
                  lastname: 'PEREZARIOS',
                  identificationType: 'CC',
                  identification: '1051635341',
                  email: 'juan@gmail.com',
                  phone: ' 3013555185',
                  isActive: true,
                  roleId: 1,
                  createdAt: '2024-03-21T03:37:25.775Z',
                  roles: {
                    id: 1,
                    name: 'superadministrador',
                    description: '',
                    isActive: true,
                    createdAt: '2024-03-20T05:07:30.082Z',
                    updatedAt: '2024-03-20T05:07:30.082Z',
                  },
                },
              ],
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Usuarios encontrados.' },
          },
        },
      },
    },
  },

  loginOkResponse: {
    status: 200,
    description: 'Login exitoso.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                user: {
                  id: 1,
                  name: 'HELMER',
                  lastname: 'VILLARREAL LARIOS',
                  identificationType: 'CC',
                  identification: '1051635340',
                  email: 'helmervillarreal@gmail.com',
                  phone: ' 3013555186',
                  isActive: true,
                  roleId: 1,
                  createdAt: '2024-03-20T05:11:45.521Z',
                  updatedAt: '2024-03-21T19:02:26.394Z',
                },
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkhFTE1FUiIsImxhc3RuYW1lIjoiVklMTEFSUkVBTCBMQVJJT1MiLCJpZGVudGlmaWNhdGlvblR5cGUiOiJDQyIsImlkZW50aWZpY2F0aW9uIjoiMTA1MTYzNTM0MCIsImVtYWlsIjoiaGVsbWVydmlsbGFycmVhbEBnbWFpbC5jb20iLCJwaG9uZSI6IiAzMDEzNTU1MTg2IiwiaXNBY3RpdmUiOnRydWUsInJvbGVJZCI6MSwiaWF0IjoxNzExMDQ4NDU1LCJleHAiOjE3MTEwNzcyNTV9.0mcXExFilMkI12TWPVQ4O71mOEqqe5M-qWdhkx2Q2No',
                modules: [
                  {
                    id: 1,
                    name: 'Configuración',
                    createdAt: '2024-03-20T05:07:30.082Z',
                    updatedAt: '2024-03-20T05:07:30.082Z',
                    permissions: [
                      {
                        id: 1,
                        description: 'gestionar usuario',
                        path: '/users',
                        createdAt: '2024-03-20T05:07:30.082Z',
                        updatedAt: '2024-03-20T05:07:30.082Z',
                        code: 'USE001',
                        moduleId: 1,
                        isActive: true,
                      },
                      {
                        id: 3,
                        description: 'gestionar planes de beneficio',
                        path: '/benefit-plans',
                        createdAt: '2024-03-20T05:07:30.082Z',
                        updatedAt: '2024-03-20T05:07:30.082Z',
                        code: 'BEN001',
                        moduleId: 1,
                        isActive: true,
                      },
                      {
                        id: 2,
                        description: 'gestionar aseguradora',
                        path: '/insurance',
                        createdAt: '2024-03-20T05:07:30.082Z',
                        updatedAt: '2024-03-20T05:07:30.082Z',
                        code: 'INS001',
                        moduleId: 1,
                        isActive: true,
                      },
                    ],
                  },
                ],
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Login exitoso.' },
          },
        },
      },
    },
  },

  loginFailedUnauthorized: {
    description: 'Error al validar autenticación.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: { type: 'object', example: {} },
            statusCode: { type: 'number', example: 401 },
            message: {
              type: 'string',
              example:
                'No es posible validar la identidad del usuario, usuario inactivo o rol de usuario inactivo.',
            },
          },
        },
      },
    },
  },

  getAuthOkReponse: {
    description: `Url encontrada exitosamente.`,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'string',
              example:
                'https://fundaciongruposocial1b2cpoc.b2clogin.com/fundaciongruposocial1b2cpoc.onmicrosoft.com/b2c_1_sales-signin-signup/oauth2/v2.0/authorize?client_id=98933929-ae6d-4db8-acbf-42165c4d2c3c&scope=openid%20profile%20offline_access&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fadmin%2F&client-request-id=1d8a3ffa-90b8-41eb-bc3d-c74648e2960d&response_mode=query&response_type=code&x-client-SKU=msal.js.node&x-client-VER=1.18.0&x-client-OS=win32&x-client-CPU=x64&client_info=1&state=login',
            },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Url encontrada exitosamente.',
            },
          },
        },
      },
    },
  },

  createLogsOkResponse: {
    description: 'Creacion del log exitosa.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                actionUserId: 1,
                description: 'El Rol fue actualizado.',
                typeAction: 'ROLE_UPDATE',
                data: {
                  name: 'administrador-',
                  description: '',
                  isActive: true,
                },
                model: 'Roles',
                modelId: 1,
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Log creado correctamente.' },
          },
        },
      },
    },
  },

  badRequestResponse: {
    description: `Solicitud incorrecta.`,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: {
              type: 'array',
              example: [
                'actionUserId must be a positive number',
                'actionUserId must be a number conforming to the specified constraints',
              ],
            },
            error: {
              type: 'string',
              example: 'Solicitud incorrecta, retorna parámetros incorrectos.',
            },
          },
        },
      },
    },
  },

  getLogsUsersOkResponse: {
    description: 'Respuesta consulta de logs por usuario.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              example: [
                {
                  id: 15,
                  actionUserId: 1,
                  description: 'El usuario fue actualizado',
                  typeAction: 'USER_UPDATE',
                  data: '{"isActive":true,"advisorEndDate":null}',
                  model: 'Users',
                  modelId: 6,
                  createdAt: '2023-07-24T17:02:55.338Z',
                  users: {
                    id: 1,
                    uid: '108bf273-3184-4a08-925a-3ede1c8264e7',
                    name: 'Jamer',
                    lastname: 'Rodriguez',
                    identificationType: 'CC',
                    identification: '12345678',
                    email: 'jfrodriguez@fundaciongruposocial.co',
                    address: 'alle 20',
                    phone: '626546116',
                    isActive: true,
                    roleId: 2,
                    supervisorId: null,
                    advisorStartDate: null,
                    advisorEndDate: null,
                    createdAt: '2023-07-21T18:35:22.315Z',
                    updatedAt: '2023-07-24T03:54:07.351Z',
                  },
                },
              ],
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Lista de logs.' },
          },
        },
      },
    },
  },

  conflictResponse: {
    description: `Respuesta para registros existentes.`,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: { type: 'object', example: {} },
            statusCode: { type: 'number', example: 409 },
            message: {
              type: 'string',
              example: 'Existe un registro con la misma información.',
            },
          },
        },
      },
    },
  },

  changePasswordUserOkResponse: {
    description: 'Respuesta exitosa al actualización contraseña de usuario.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                id: 1,
                name: 'HELMER',
                lastname: 'VILLARREAL LARIOS',
                identificationType: 'CC',
                identification: '1051635340',
                email: 'helmervillarreal@gmail.com',
                phone: ' 3013555186',
                isActive: true,
                roleId: 1,
                createdAt: '2024-03-20T05:11:45.521Z',
                updatedAt: '2024-03-21T22:48:55.917Z',
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Contraseña actualizada correctamente.',
            },
          },
        },
      },
    },
  },

  createEventOkResponse: {
    description: 'Respuesta exitosa creación de evento.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                id: 3,
                title: 'REUNIÓN DAILY',
                description: 'REUNIÓN DÍARIA EN LAS MAÑANAS',
                location: 'SALON CUSIANA',
                startDateTime: '2025-01-20T15:30:00Z',
                endDateTime: '2025-01-20T15:30:00Z',
                updatedAt: '2025-02-22T02:50:14.616Z',
                createdAt: '2025-02-22T02:50:14.616Z',
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Evento creado correctamente.',
            },
          },
        },
      },
    },
  },

  getAllEventsOkResponse: {
    description: 'Respuesta exitosa consulta de eventos.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                count: 1,
                events: [
                  {
                    id: 3,
                    title: 'REUNIÓN DAILY',
                    description: 'REUNIÓN DÍARIA EN LAS MAÑANAS',
                    location: 'SALON CUSIANA',
                    startDateTime: '2025-01-20T15:30:00Z',
                    endDateTime: '2025-01-20T15:30:00Z',
                    updatedAt: '2025-02-22T02:50:14.616Z',
                    createdAt: '2025-02-22T02:50:14.616Z',
                  },
                  {
                    id: 5,
                    title: 'REUNIÓN DAILY CUATRO',
                    description: 'REUNIÓN DÍARIA EN LAS MAÑANAS',
                    location: 'SALON CUSIANA 4',
                    startDateTime: '2024-02-20T10:30:00Z',
                    endDateTime: '2024-01-20T20:00:00Z',
                    updatedAt: '2025-02-22T03:32:36.093Z',
                    createdAt: '2025-02-22T03:32:36.093Z',
                  },
                ],
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Eventos encontrados.' },
          },
        },
      },
    },
  },

  getOneEventsOkResponse: {
    description: 'Respuesta exitosa consulta de evento por id.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                id: 3,
                title: 'REUNIÓN DAILY',
                description: 'REUNIÓN DÍARIA EN LAS MAÑANAS',
                location: 'SALON CUSIANA',
                startDateTime: '2025-01-20T15:30:00Z',
                endDateTime: '2025-01-20T15:30:00Z',
                updatedAt: '2025-02-22T02:50:14.616Z',
                createdAt: '2025-02-22T02:50:14.616Z',
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Evento encontrado.' },
          },
        },
      },
    },
  },

  updateEventOkResponse: {
    description: 'Respuesta exitosa actualización de evento.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                id: 3,
                title: 'REUNIÓN DAILY CUATRO UPDATE',
                description: 'REUNIÓN DÍARIA EN LAS MAÑANAS UPDATE',
                location: 'SALON CUSIANA 4 UPDATE',
                startDateTime: '2024-02-20T10:40:00Z',
                endDateTime: '2024-01-20T20:40:00Z',
                updatedAt: '2025-02-22T03:57:05.964Z',
                createdAt: '2025-02-22T02:50:14.616Z',
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Evento actualizado correctamente.',
            },
          },
        },
      },
    },
  },

  deleteEventsOkResponse: {
    description: 'Respuesta exitosa eliminación de evento por id.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                id: 3,
                title: 'REUNIÓN DAILY',
                description: 'REUNIÓN DÍARIA EN LAS MAÑANAS',
                location: 'SALON CUSIANA',
                startDateTime: '2025-01-20T15:30:00Z',
                endDateTime: '2025-01-20T15:30:00Z',
                updatedAt: '2025-02-22T02:50:14.616Z',
                createdAt: '2025-02-22T02:50:14.616Z',
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Evento eliminado correctamente.',
            },
          },
        },
      },
    },
  },

  createRegistrationOkResponse: {
    description: 'Respuesta exitosa creación de inscripción.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                id: 2,
                userId: 1,
                eventId: 1,
                createdAt: '2025-02-22T18:06:15.146Z',
                wasCanceled: false,
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Inscripción realizada correctamente',
            },
          },
        },
      },
    },
  },

  getAllRegistrationsOkResponse: {
    description: 'Respuesta exitosa consulta de eventos.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                count: 1,
                registrations: [
                  {
                    id: 3,
                    userId: 2,
                    eventId: 1,
                    createdAt: '2025-02-22T18:34:20.699Z',
                    wasCanceled: true,
                    User: {
                      id: 2,
                      name: 'LUISA',
                      lastname: 'RUIZ',
                      identificationType: 'CC',
                      identification: '222222',
                      email: 'helmervillarreal5@gmail.com',
                      phone: '3013555186',
                      isActive: true,
                      password:
                        '$2b$10$yu/5MSIkivXQLMWPw8t6ZOduYCVHhMDqsW0lisdHZnL6CQQdqOLOC',
                      roleId: 2,
                      createdAt: '2025-02-22T18:27:14.630Z',
                      updatedAt: '2025-02-22T18:27:14.630Z',
                    },
                    Event: {
                      id: 1,
                      title: 'REUNIÓN DAILY CUATRO',
                      description: 'REUNIÓN DÍARIA EN LAS MAÑANAS',
                      location: 'SALON CUSIANA 4',
                      startDateTime: '2025-02-22T19:30:00Z',
                      endDateTime: '2025-02-22T18:30:00Z',
                      updatedAt: '2025-02-22T16:10:25.228Z',
                      createdAt: '2025-02-22T16:10:25.228Z',
                    },
                  },
                  {
                    id: 2,
                    userId: 1,
                    eventId: 1,
                    createdAt: '2025-02-22T18:06:15.146Z',
                    wasCanceled: false,
                    User: {
                      id: 1,
                      name: 'HELMER',
                      lastname: 'VILLARREAL LARIOS',
                      identificationType: 'CC',
                      identification: '1051635340',
                      email: 'helmervillarreal@gmail.com',
                      phone: ' 3013555186',
                      isActive: true,
                      password:
                        '$2b$10$VSx0JpqxazNktNrKXfuRDuY9k6vRQihcILYInAHBgLTXqEZBSkRMO',
                      roleId: 1,
                      createdAt: '2025-02-22T16:09:17.643Z',
                      updatedAt: '2025-02-22T16:09:17.643Z',
                    },
                    Event: {
                      id: 1,
                      title: 'REUNIÓN DAILY CUATRO',
                      description: 'REUNIÓN DÍARIA EN LAS MAÑANAS',
                      location: 'SALON CUSIANA 4',
                      startDateTime: '2025-02-22T19:30:00Z',
                      endDateTime: '2025-02-22T18:30:00Z',
                      updatedAt: '2025-02-22T16:10:25.228Z',
                      createdAt: '2025-02-22T16:10:25.228Z',
                    },
                  },
                ],
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Eventos encontrados.' },
          },
        },
      },
    },
  },

  cancelRegistrationOkResponse: {
    description: 'Respuesta exitosa cancelación de inscripción.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              example: {
                id: 3,
                userId: 2,
                eventId: 1,
                createdAt: '2025-02-22T18:34:20.699Z',
                wasCanceled: true,
              },
            },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Inscripción cancelada correctamente',
            },
          },
        },
      },
    },
  },
};
