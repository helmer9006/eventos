import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'La contraseña nueva es obligatoria' })
  @IsString({
    message: 'La contraseña nueva debe ser una cadena de texto',
  })
  @ApiProperty({
    description: 'La contraseña nueva del usuario en base 64',
    example: 'wqFIb2xhLCBtdW5kbyE=',
  })
  newPassword: string;
}
