import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { QuestionsHttpService } from '../questions.http.service'; // Ajusta según tu servicio HTTP para preguntas

@Injectable()
export class GetQuestionsService {
  private readonly logger = new Logger(GetQuestionsService.name);

  constructor(private questionsHttpService: QuestionsHttpService) {}

  async getAllQuestions(): Promise<any> {
    this.logger.log('Fetching all questions');
    return this.questionsHttpService.getAllQuestions();
  }

  async getQuestionById(id: number): Promise<any> {
    this.logger.log(`Fetching question with ID: ${id}`);
    try {
      return await this.questionsHttpService.getQuestionById(id);
    } catch (error) {
      this.logger.error(`Question with ID: ${id} not found`);
      throw new NotFoundException('Question not found');
    }
  }

  // Puedes agregar métodos adicionales aquí según sea necesario para obtener preguntas por otros criterios
}
