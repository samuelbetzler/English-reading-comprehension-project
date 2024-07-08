import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateQuestionsService } from './create-questions.service';
import { CreateQuestionsInput } from './create-questions.input';
import { Questions } from '../shared/questions.entity'; // Asegúrate de importar la entidad correcta si es necesario

@Resolver('Questions') // Ajusta el nombre de la entidad según sea necesario
export class CreateQuestionsResolver {
  constructor(private readonly createQuestionsService: CreateQuestionsService) {}

  @Mutation(() => Questions)
  async createQuestion(@Args('createQuestionsInput') createQuestionsInput: CreateQuestionsInput) {
    return this.createQuestionsService.createQuestion(createQuestionsInput);
  }
}
