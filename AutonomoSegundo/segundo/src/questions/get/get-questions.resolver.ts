import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GetQuestionsService } from './get-questions.service';
import { Questions } from '../shared/questions.entity'; // Ajusta según la entidad real de preguntas

@Resolver('Question')
export class GetQuestionsResolver {
  constructor(private readonly getQuestionsService: GetQuestionsService) {}

  @Query(() => [Questions])
  async questions() {
    return this.getQuestionsService.getAllQuestions();
  }

  @Query(() => Questions)
  async question(@Args('id', { type: () => Int }) id: number) {
    return this.getQuestionsService.getQuestionById(id);
  }
}
