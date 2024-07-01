import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateQuizService } from './create-quiz.service';
import { CreateQuizInput } from './create-quiz.input';
import { Quiz } from '../shared/quiz.entity';

@Resolver('Quiz')
export class CreateQuizResolver {
  constructor(private readonly createQuizService: CreateQuizService) {}

  @Mutation(() => Quiz)
  async createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput) {
    return this.createQuizService.createQuiz(createQuizInput);
  }
}
