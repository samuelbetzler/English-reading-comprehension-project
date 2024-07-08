import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionsHttpService } from '../questions.http.service'; // Ajusta según tu servicio HTTP para preguntas
import { UpdateQuestionsInput } from './update-questions.input'; // Ajusta según el input de actualización de preguntas

@Injectable()
export class UpdateQuestionsService {
  constructor(private questionsHttpService: QuestionsHttpService) {}

  async updateQuestion(id: number, updateQuestionInput: UpdateQuestionsInput): Promise<any> {
    try {
      return await this.questionsHttpService.updateQuestion(id, updateQuestionInput);
    } catch (error) {
      throw new NotFoundException('Question not found');
    }
  }
}
