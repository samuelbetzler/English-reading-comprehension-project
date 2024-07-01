import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateQuizInput } from '../create/create-quiz.input';

@InputType()
export class UpdateQuizInput extends PartialType(CreateQuizInput) {
  @Field(() => Int)
  @IsInt()
  id: number;
}