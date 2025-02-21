import { Validate } from 'class-validator';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'maxNumberDigits', async: false })
export class MaxNumberDigits implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const maxDigits = args.constraints[0];
    return (
      typeof value === 'number' &&
      Math.floor(Math.log10(Math.abs(value)) + 1) <= maxDigits
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `El número no puede tener más de ${args.constraints[0]} dígitos.`;
  }
}
