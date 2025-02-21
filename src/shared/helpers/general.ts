import { HttpStatus } from '@nestjs/common';
import { GenericResponse } from '../models/generic-response.model';

export const isNumber = (term: any): boolean => {
  return term == Number(term);
};
export const handleExceptions = (error: any): never => {
  const field = translateFieldToSpanish(
    error.meta && error.meta.target && error.meta.target.length > 0
      ? error.meta.target[0]
      : '',
  );
  if (error.code === '23505')
    throw new GenericResponse(
      {},
      HttpStatus.CONFLICT.valueOf(),
      `Existe un registro con la misma información proporcionada en el campo ${field}`,
    );
  if (error.code === 'P2002') {
    throw new GenericResponse(
      {},
      HttpStatus.CONFLICT.valueOf(),
      `Existe un registro con la misma información proporcionada en el campo ${field}`,
    );
  }
  if (error.code === 'P2003')
    throw new GenericResponse(
      {},
      HttpStatus.BAD_REQUEST.valueOf(),
      'No se encontraron registros con la información proporcionada, o el registro está vinculado a otra transacción.',
    );
  if (error.code === 'P2025')
    throw new GenericResponse(
      {},
      HttpStatus.BAD_REQUEST.valueOf(),
      'No existe registro con la información proporcionada.',
    );

  if (error.code === 'P2028')
    throw new GenericResponse(
      {},
      HttpStatus.BAD_REQUEST.valueOf(),
      'No se pudo completar la transacción, por favor intente nuevamente.',
    );
  if (error.code === 'P1001')
    throw new GenericResponse(
      {},
      HttpStatus.INTERNAL_SERVER_ERROR.valueOf(),
      'Ha ocurrido un error de conexión con la base de datos.',
    );
  const msg = error.message ? error.message : 'Error interno del servidor';
  const status = error.status
    ? error.status
    : error.statusCode
    ? error.statusCode
    : 500;
  throw new GenericResponse({}, status, msg);
};

const translateFieldToSpanish = (field: string) => {
  switch (field) {
    case 'name':
      field = 'nombre';
      break;
    case 'identification':
      field = 'identificación';
      break;
    case 'email':
      field = 'correo electrónico';
      break;
    case 'title':
      field = 'título';
      break;
    case 'index':
      field = 'índice';
      break;
    case 'userId':
      field = 'id de usuario';
      break;
    case 'description':
      field = 'descripción';
      break;;
    default:
      break;
  }
  return field;
};
