import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { DeleteQuestionsService } from './delete-questions.service';

@Resolver('Questions') // Asegúrate de ajustar el nombre de la entidad según sea necesario
export class DeleteQuestionsResolver {
  constructor(private readonly deleteQuestionsService: DeleteQuestionsService) {}

  @Mutation(() => Boolean)
  async deleteQuestion(@Args('id', { type: () => Int }) id: number) {
    await this.deleteQuestionsService.deleteQuestion(id);
    return true;
  }
}