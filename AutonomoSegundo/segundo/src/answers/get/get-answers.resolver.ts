import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GetAnswersService } from './get-answers.service';
import { Answers } from '../shared/answers.entity';

@Resolver('Answers')
export class GetAnswersResolver {
  constructor(private readonly getAnswersService: GetAnswersService) {}

  @Query(() => [Answers])
  async answers() {
    return this.getAnswersService.getAllAnswers();
  }

  @Query(() => Answers)
  async answer(@Args('id', { type: () => Int }) id: number) {
    return this.getAnswersService.getAnswerById(id);
  }

  @Query(() => [Answers])
  async answersByQuestionId(@Args('questionId', { type: () => Int }) questionId: number) {
    return this.getAnswersService.getAnswersByQuestionId(questionId);
  }

  @Query(() => [Answers])
  async correctAnswers(@Args('isCorrect') isCorrect: boolean) {
    return this.getAnswersService.getCorrectAnswers(isCorrect);
  }
}
