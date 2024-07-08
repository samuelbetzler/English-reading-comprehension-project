import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateAnswersService } from './create-answers.service';
import { CreateAnswersInput } from './create-answers.input';
import { Answers } from '../shared/answers.entity';

@Resolver('Answers')
export class CreateAnswersResolver {
  constructor(private readonly createAnswersService: CreateAnswersService) {}

  @Mutation(() => Answers)
  async createAnswer(@Args('createAnswersInput') createAnswersInput: CreateAnswersInput) {
    return this.createAnswersService.createAnswer(createAnswersInput);
  }
}
