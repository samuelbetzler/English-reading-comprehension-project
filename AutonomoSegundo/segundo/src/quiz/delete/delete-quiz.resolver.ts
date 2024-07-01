import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { DeleteQuizService } from './delete-quiz.service';

@Resolver('Quiz')
export class DeleteQuizResolver {
  constructor(private readonly deleteQuizService: DeleteQuizService) {}

  @Mutation(() => Boolean)
  async deleteQuiz(@Args('id', { type: () => Int }) id: number) {
    await this.deleteQuizService.deleteQuiz(id);
    return true;
  }
}
