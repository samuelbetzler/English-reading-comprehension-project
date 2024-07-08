import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateAnswersInput } from '../create/create-answers.input';

@InputType()
export class UpdateAnswersInput extends PartialType(CreateAnswersInput) {
  @Field(() => Int)
  @IsInt()
  id: number;
}