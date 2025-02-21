import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @Transform((params: TransformFnParams) => params.value.trim())
  @ApiProperty({
    description: 'Direccion de correo electronico.',
    example: 'usuario@gmail.com',
  })
  @IsNotEmpty({ message: 'El correo electrónico debe no puede estar vacío.' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido.' })
  email: string;

  @IsNotEmpty({ message: 'El password es obligatorio' })
  @IsString({
    message: 'El password debe ser una cadena de texto',
  })
  @ApiProperty({
    description: 'Contraseña del usuario en base 64',
    example: 'wqFIb2xhLCBtdW5kbyE=',
  })
  password: string;
}
