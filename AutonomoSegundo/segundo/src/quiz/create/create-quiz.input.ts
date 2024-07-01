import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateQuizInput {
  @Field()
  @IsNotEmpty({ message: 'Difficulty level cannot be null' })
  @Length(1, 50, { message: 'Difficulty level must be between 1 and 50 characters' })
  difficultyLevel: string;

  @Field()
  @IsNotEmpty({ message: 'Title cannot be null' })
  @Length(1, 100, { message: 'Title must be between 1 and 100 characters' })
  title: string;
}

