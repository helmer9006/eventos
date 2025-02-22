import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsISO8601,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateEventDto {
  @Transform((params: TransformFnParams) => params.value.toUpperCase().trim())
  @IsString({ message: 'El título del evento es requerido.' })
  @Matches(/^[a-zA-ZáéíóúüÜÁÉÍÓÚñÑ\s]+$/, {
    message: 'El campo título solo puede contener datos alfabéticos',
  })
  @Length(1, 255, { message: 'El título no puede exceder los 255 caracteres.' })
  @ApiProperty({
    description:
      'El título del evento es requerido y debe ser de tipo alfabético.',
    nullable: true,
    example: 'Reunión',
  })
  title: string;

  @Transform((params: TransformFnParams) => params.value.toUpperCase().trim())
  @IsString({ message: 'La descripción del evento es requerido.' })
  @Matches(/^[a-zA-ZáéíóúüÜÁÉÍÓÚñÑ\s]+$/, {
    message: 'El campo descripción solo puede contener datos alfabéticos',
  })
  @Length(1, 500, {
    message: 'La descripción no puede exceder los 500 caracteres.',
  })
  @ApiProperty({
    description:
      'La descripción del evento es requerida y debe ser de tipo alfabético.',
    nullable: true,
    example: 'Reunión importante para definir..',
  })
  description: string;

  @Transform((params: TransformFnParams) => params.value.toUpperCase().trim())
  @IsString({ message: 'La ubicación del evento es requerida.' })
  @Length(1, 255, {
    message: 'La ubicación no puede exceder los 255 caracteres.',
  })
  @ApiProperty({
    description:
      'La ubicación del evento es requerida y debe ser una cadena de texto.',
    nullable: true,
    example: 'Salon principal piso 6',
  })
  location: string;

  @ApiProperty({
    description: 'Fecha y hora de inicio del evento en formato ISO 8601.',
    example: '2024-01-20T15:30:00Z',
  })
  @Transform(({ value }) => value.trim()) // Elimina espacios en blanco
  @IsISO8601(
    { strict: true },
    {
      message:
        'La fecha debe estar en formato ISO 8601 con hora (YYYY-MM-DDTHH:MM:SSZ)',
    },
  )
  startDateTime: string;

  @ApiProperty({
    description: 'Fecha y hora de fin del evento en formato ISO 8601.',
    example: '2024-01-20T15:30:00Z',
  })
  @Transform(({ value }) => value.trim()) // Elimina espacios en blanco
  @IsISO8601(
    { strict: true },
    {
      message:
        'La fecha debe estar en formato ISO 8601 con hora (YYYY-MM-DDTHH:MM:SSZ)',
    },
  )
  endDateTime: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
