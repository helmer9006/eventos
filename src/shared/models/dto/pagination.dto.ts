import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class PaginationDto {
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
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @ApiProperty({
    description: 'Nombre',
    nullable: false,
    example: 'nombre',
  })
  term?: string;
}
