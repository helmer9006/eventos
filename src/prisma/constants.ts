export const modules = [
  {
    id: 1,
    name: 'Configuración',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Eventos',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const roles = [
  {
    id: 1,
    name: 'superadministrador',
    description: 'Rol que tendrá acceso a todo el sistema.',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'suscriptor',
    description: 'Persona que se registra para asistir a eventos.',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const permissions = [
  {
    id: 1,
    description: 'gestionar usuario',
    path: '/users',
    code: 'USE001',
    moduleId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    description: 'gestionar eventos',
    path: '/events',
    code: 'EVE001',
    moduleId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    description: 'gestionar inscripciones',
    path: '/registrations',
    code: 'REG001',
    moduleId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const users = [
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
    password: '$2b$10$VSx0JpqxazNktNrKXfuRDuY9k6vRQihcILYInAHBgLTXqEZBSkRMO',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const rolesPermissions = [
  {
    roleId: 1,
    permissionId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    roleId: 1,
    permissionId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    roleId: 1,
    permissionId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    roleId: 2,
    permissionId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
