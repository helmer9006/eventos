import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsDate, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateEntityDto {
  @Transform((params: TransformFnParams) => params.value.toUpperCase().trim())
  @IsString({ message: 'El campo nombre del usuario es requerido.' })
  @Matches(/^[a-zA-ZáéíóúüÜÁÉÍÓÚñÑ.\s]+$/, {
    message:
      'El campo nombre solo puede contener datos alfabéticos y espacios.',
  })
  @Length(1, 255, { message: 'El nombre no puede exceder los 255 caracteres.' })
  @ApiProperty({
    description:
      'Nombre de la entidad es requerido y debe ser de tipo alfabético.',
    nullable: true,
    example: 'Sura',
  })
  name: string;

  @Transform((params: TransformFnParams) => params.value.trim())
  @IsString({ message: 'El nit es obligatorio.' })
  @Length(1, 16, {
    message: 'El Nit debe contener entre 1 y 16 caracteres.',
  })
  @Matches(/^[0-9-]+$/, {
    message: 'El Nit no tiene un formato válido(800038023-3).',
  })
  nit: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
