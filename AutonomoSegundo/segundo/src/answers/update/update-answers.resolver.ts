import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UpdateAnswersService } from './update-answers.service';
import { UpdateAnswersInput } from './update-answers.input';
import { Answers } from '../shared/answers.entity';

@Resolver('Answers')
export class UpdateAnswersResolver {
  constructor(private readonly updateAnswersService: UpdateAnswersService) {}

  @Mutation(() => Answers)
  async updateAnswers(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAnswersInput') updateAnswersInput: UpdateAnswersInput,
  ) {
    return this.updateAnswersService.updateAnswers(id, updateAnswersInput);
  }
}
