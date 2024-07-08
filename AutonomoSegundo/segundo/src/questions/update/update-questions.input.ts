import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateQuestionsInput } from '../create/create-questions.input';

@InputType()
export class UpdateQuestionsInput extends PartialType(CreateQuestionsInput) {
  @Field(() => Int)
  @IsInt()
  id: number;
}