import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateStoryInput } from '../create/create-story.input';

@InputType()
export class UpdateStoryInput extends PartialType(CreateStoryInput) {
  @Field(() => Int)
  @IsInt()
  id: number;
}