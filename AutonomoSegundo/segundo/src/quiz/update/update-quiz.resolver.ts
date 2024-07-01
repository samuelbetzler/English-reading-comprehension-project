import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UpdateQuizService } from './update-quiz.service';
import { UpdateQuizInput } from './update-quiz.input';
import { Quiz } from '../shared/quiz.entity';

@Resolver('Quiz')
export class UpdateQuizResolver {
  constructor(private readonly updateQuizService: UpdateQuizService) {}

  @Mutation(() => Quiz)
  async updateQuiz(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateQuizInput') updateQuizInput: UpdateQuizInput,
  ) {
    return this.updateQuizService.updateQuiz(id, updateQuizInput);
  }
}
