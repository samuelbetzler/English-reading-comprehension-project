import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { QuizHttpService } from '../quiz.http.service';

@Injectable()
export class GetQuizService {
  private readonly logger = new Logger(GetQuizService.name);

  constructor(private quizHttpService: QuizHttpService) {}

  async getAllQuizzes() {
    this.logger.log(`Fetching all quizzes`);
    return this.quizHttpService.getAllQuizzes();
  }

  async getQuizById(id: number) {
    this.logger.log(`Fetching quiz with ID: ${id}`);
    try {
      return await this.quizHttpService.getQuizById(id);
    } catch (error) {
      this.logger.error(`Quiz with ID: ${id} not found`);
      throw new NotFoundException('Quiz not found');
    }
  }

  async getQuizzesByDifficultyLevel() {
    return this.quizHttpService.getAllQuizzes(); // Ajusta según tu endpoint real
  }

  async getQuizByTitle() {
    try {
      return await this.quizHttpService.getAllQuizzes(); // Ajusta según tu endpoint real
    } catch (error) {
      throw new NotFoundException('Quiz not found');
    }
  }
}
