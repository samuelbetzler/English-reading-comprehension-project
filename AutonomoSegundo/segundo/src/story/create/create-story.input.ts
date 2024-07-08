import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length, IsInt } from 'class-validator';

@InputType()
export class CreateStoryInput {
  @Field()
  @IsNotEmpty({ message: 'Title cannot be null' })
  @Length(1, 100, { message: 'Title must be between 1 and 100 characters' })
  title: string;

  @Field()
  @IsNotEmpty({ message: 'Author cannot be null' })
  @Length(1, 50, { message: 'Author must be between 1 and 50 characters' })
  author: string;

  @Field()
  @IsNotEmpty({ message: 'Text cannot be null' })
  @Length(1, 500, { message: 'Text must be between 1 and 500 characters' })
  text: string;

  @Field()
  @IsNotEmpty({ message: 'Quiz ID cannot be null' })
  @IsInt({ message: 'Quiz ID must be an integer' })
  quizId: number;
}
