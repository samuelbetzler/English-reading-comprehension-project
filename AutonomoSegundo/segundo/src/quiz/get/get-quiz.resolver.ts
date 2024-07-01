import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GetQuizService } from './get-quiz.service';
import { Quiz } from '../shared/quiz.entity';

@Resolver('Quiz')
export class GetQuizResolver {
  constructor(private readonly getQuizService: GetQuizService) {}

  @Query(() => [Quiz])
  async quizzes() {
    return this.getQuizService.getAllQuizzes();
  }

  @Query(() => Quiz)
  async quiz(@Args('id', { type: () => Int }) id: number) {
    return this.getQuizService.getQuizById(id);
  }

  
}
