import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  IsInt,
  IsISO8601,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class PaginationEventsDto {
  @ApiProperty({
    default: 10,
    description: 'Cuantas filas.',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 1,
    description: 'Cuántas filas quieres saltar',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'La página debe ser un número positivo mayor a 0.' })
  offset?: number;

  @IsOptional()
  @Transform((params: TransformFnParams) => params.value.trim())
  @IsString({ message: 'La ubicación debe ser una cadena de texto.' })
  @ApiProperty({
    description: 'Ubicación',
    nullable: true,
    example: 'piso 2',
  })
  location?: string;

  @ApiProperty({
    description: 'Fecha y hora de inicio del evento en formato ISO 8601.',
    example: '2024-01-20T15:30:00Z',
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsISO8601(
    { strict: true },
    {
      message:
        'La fecha debe estar en formato ISO 8601 con hora (YYYY-MM-DDTHH:MM:SSZ)',
    },
  )
  startDateTime?: string;

  @ApiProperty({
    description: 'Fecha y hora de fin del evento en formato ISO 8601.',
    example: '2024-01-20T15:30:00Z',
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsISO8601(
    { strict: true },
    {
      message:
        'La fecha debe estar en formato ISO 8601 con hora (YYYY-MM-DDTHH:MM:SSZ)',
    },
  )
  endDateTime?: string;
}
