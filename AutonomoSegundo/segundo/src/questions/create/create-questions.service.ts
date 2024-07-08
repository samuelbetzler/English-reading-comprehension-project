import { Injectable } from '@nestjs/common';
import { QuestionsHttpService } from '../questions.http.service'; // Asegúrate de importar el servicio correcto
import { CreateQuestionsInput } from './create-questions.input';

@Injectable()
export class CreateQuestionsService {
  constructor(private questionsHttpService: QuestionsHttpService) {}

  async createQuestion(createQuestionsInput: CreateQuestionsInput) {
    const { text, quizId } = createQuestionsInput;
    // Aquí podrías validar o procesar los datos antes de enviarlos al servicio HTTP

    try {
      // Llama al método correspondiente en tu servicio HTTP para crear la pregunta
      return await this.questionsHttpService.createQuestion({ text, quizId });
    } catch (error) {
      // Maneja cualquier error aquí si es necesario
      throw new Error(`Error creating question: ${error.message}`);
    }
  }
}
