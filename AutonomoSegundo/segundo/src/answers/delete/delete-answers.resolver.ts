import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { DeleteAnswersService } from './delete-answers.service';

@Resolver('Answers')
export class DeleteAnswersResolver {
  constructor(private readonly deleteAnswersService: DeleteAnswersService) {}

  @Mutation(() => Boolean)
  async deleteAnswer(@Args('id', { type: () => Int }) id: number) {
    await this.deleteAnswersService.deleteAnswer(id);
    return true;
  }
}

