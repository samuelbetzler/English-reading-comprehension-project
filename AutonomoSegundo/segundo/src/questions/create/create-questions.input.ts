import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt, Length } from 'class-validator';

@InputType()
export class CreateQuestionsInput {
  @Field()
  @IsNotEmpty({ message: 'Text cannot be null' })
  @IsString({ message: 'Text must be a string' })
  @Length(1, 500, { message: 'Text must be between 1 and 500 characters' })
  text: string;

  @Field()
  @IsNotEmpty({ message: 'Quiz ID cannot be null' })
  @IsInt({ message: 'Quiz ID must be an integer' })
  quizId: number;
}
