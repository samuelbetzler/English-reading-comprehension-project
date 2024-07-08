import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UpdateQuestionsService } from './update-questions.service';
import { UpdateQuestionsInput } from './update-questions.input'; // Asegúrate de importar el input correcto
import { Questions } from '../shared/questions.entity'; // Ajusta según la entidad de pregunta

@Resolver('Question')
export class UpdateQuestionsResolver {
  constructor(private readonly updateQuestionsService: UpdateQuestionsService) {}

  @Mutation(() => Questions)
  async updateQuestion(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionsInput,
  ): Promise<Questions> {
    return this.updateQuestionsService.updateQuestion(id, updateQuestionInput);
  }
}
