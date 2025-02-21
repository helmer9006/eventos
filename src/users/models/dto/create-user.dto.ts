import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsNumber,
  IsEmail,
  Matches,
  Length,
  IsNotEmpty,
  IsIn,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @Transform((params: TransformFnParams) => params.value.toUpperCase().trim())
  @IsString({ message: 'El campo nombre del usuario es requerido.' })
  @Matches(/^[a-zA-ZáéíóúüÜÁÉÍÓÚñÑ\s]+$/, {
    message:
      'El campo nombre solo puede contener datos alfabéticos y espacios.',
  })
  @Length(1, 255, { message: 'El nombre no puede exceder los 255 caracteres.' })
  @ApiProperty({
    description:
      'Nombre del usuario es requerido y debe ser de tipo alfabético.',
    nullable: true,
    example: 'Juan',
  })
  name: string;

  @Transform((params: TransformFnParams) => params.value.toUpperCase().trim())
  @IsString({ message: 'El campo apellido del usuario es requerido.' })
  @Matches(/^[a-zA-ZáéíóúüÜÁÉÍÓÚñÑ\s]+$/, {
    message:
      'El campo apellido solo puede contener datos alfabéticos y espacios.',
  })
  @Length(1, 255, {
    message: 'El apellido no puede exeder los 255 caracteres.',
  })
  @ApiProperty({
    description:
      'Apellido del usuario es requerido y debe ser de tipo alfabético.',
    nullable: false,
    example: 'Perez ramirez',
  })
  lastname: string;

  @IsNotEmpty({ message: 'El tipo de identificación es obligatorio' })
  @IsString({
    message: 'El tipo de identificación debe ser una cadena de texto',
  })
  @IsIn(['CC', 'CE', 'PEP', 'PPT'], {
    message: 'El tipo de identificación debe ser CC o CE',
  })
  @ApiProperty({
    description: 'Tipo de identificación (CC, CE, PEP, PPT)',
    example: 'CC',
  })
  identificationType: string;

  @IsNotEmpty({ message: 'El número de identificación es obligatorio' })
  @IsString({
    message: 'El número de identificación debe ser una cadena de texto',
  })
  @MaxLength(15, {
    message: 'El número de identificación debe contener máximo 15 caracteres',
  })
  @ApiProperty({
    description: 'Número de identificación',
    example: '00000000',
  })
  identification: string;

  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  @IsString({
    message: 'El número de teléfono debe ser una cadena de texto',
  })
  @MaxLength(15, {
    message: 'El número de teléfono debe contener máximo 15 caracteres',
  })
  @ApiProperty({
    description: 'Telefono o celular del usuario',
    nullable: false,
    example: '3200000000',
  })
  phone: string;

  @Transform((params: TransformFnParams) => params.value.trim())
  @ApiProperty({
    description: 'Direccion de correo electronico.',
    example: 'usuario@gmail.com',
  })
  @IsNotEmpty({ message: 'El correo electrónico debe no puede estar vacío.' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido.' })
  email: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Estado del usuario',
    nullable: true,
    example: true,
  })
  isActive?: boolean;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({
    message: 'La contraseña debe ser una cadena de texto',
  })
  @ApiProperty({
    description: 'La contraseña del usuario en base 64',
    example: 'wqFIb2xhLCBtdW5kbyE=',
  })
  password: string;

  @IsNumber({}, { message: 'El campo rol del usuario es requerido.' })
  @ApiProperty({
    description: 'Id del rol asignado al usuario.',
    nullable: false,
    example: 1,
  })
  roleId: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
