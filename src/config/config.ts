import { registerAs } from '@nestjs/config';
export default registerAs('config', () => {
  return {
    jwtSecret: process.env.JWT_SECRET,
    swaggerPassword: process.env.SWAGGER_PASS,
    AUDIT_ACTIONS: {
      USER_CREATE: {
        action: 'USER_CREATE',
        description: 'Nuevo usuario creado en el sistema.',
      },
      USER_UPDATE: {
        action: 'USER_UPDATE',
        description: 'La información del usuario fue actualizada.',
      },
      USER_DISABLE: {
        action: 'USER_DISABLE',
        description: 'El usuario fue desabilitado en el sistema.',
      },
      ROLE_CREATE: {
        action: 'ROLE_CREATE',
        description: 'Nuevo rol creado en el sistema.',
      },
      ROLE_UPDATE: {
        action: 'ROLE_UPDATE',
        description: 'El Rol fue actualizado.',
      },
      ROLE_DISABLE: {
        action: 'ROLE_DISABLE',
        description: 'El rol fue desabilitado en el sistema.',
      },
      CHANGE_PASSWORD: {
        action: 'CHANGE_PASSWORD',
        description: 'La contraseña fue moficiada.',
      },
    },
    MODELS: {
      USERS: 'Users',
    },

  };
});
