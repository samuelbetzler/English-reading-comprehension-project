
import { Injectable } from '@nestjs/common';
import { QuestionsHttpService } from '../questions.http.service'; // Ajusta el servicio según sea necesario

@Injectable()
export class DeleteQuestionsService {
  constructor(private questionsHttpService: QuestionsHttpService) {}

  async deleteQuestion(id: number): Promise<void> {
    try {
      await this.questionsHttpService.deleteQuestion(id);
    } catch (error) {
      // Maneja cualquier error aquí si es necesario
      throw new Error(`Error deleting question: ${error.message}`);
    }
  }
}
