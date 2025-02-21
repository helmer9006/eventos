import { PartialType } from '@nestjs/swagger';
import { CreateBenefitPlansDto } from './create-benefit-plan.dto';

export class UpdateBenefitPlanDto extends PartialType(CreateBenefitPlansDto) {}
