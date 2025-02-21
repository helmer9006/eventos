import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateBenefitPlansDto {
  @Transform((params: TransformFnParams) => params.value.toUpperCase().trim())
  @IsString({ message: 'El campo nombre del usuario es requerido.' })
  @Matches(/^[a-zA-ZáéíóúüÜÁÉÍÓÚñÑ.\s]+$/, {
    message:
      'El campo nombre solo puede contener datos alfabéticos y espacios.',
  })
  @Length(1, 255, {
    message:
      'El nombre del plan de beneficio no puede exceder los 255 caracteres.',
  })
  @ApiProperty({
    description:
      'El nombre del plan de beneficio es requerido y debe ser de tipo alfabético.',
    nullable: true,
    example: 'Plan Sura',
  })
  name: string;

  @ApiProperty({
    description: 'Identificador unico de la entidad relacionada.',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  entityId: number;

  @IsNumber(
    {},
    { message: 'El código del plan de beneficio debe ser númerico' },
  )
  @ApiProperty({
    description: 'Código que identifica el plan de beneficio.',
    example: '32',
  })
  code: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
