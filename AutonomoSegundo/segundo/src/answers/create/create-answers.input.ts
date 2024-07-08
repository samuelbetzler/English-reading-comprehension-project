import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean, IsInt, Length } from 'class-validator';

@InputType()
export class CreateAnswersInput {
  @Field()
  @IsNotEmpty({ message: 'Text cannot be null' })
  @IsString({ message: 'Text must be a string' })
  @Length(1, 1000, { message: 'Text must be between 1 and 1000 characters' })
  text: string;

  @Field()
  @IsNotEmpty({ message: 'isCorrect cannot be null' })
  @IsBoolean({ message: 'isCorrect must be a boolean' })
  isCorrect: boolean;

  @Field()
  @IsNotEmpty({ message: 'Questions ID cannot be null' })
  @IsInt({ message: 'Questions ID must be an integer' })
  questionsId: number;
}
