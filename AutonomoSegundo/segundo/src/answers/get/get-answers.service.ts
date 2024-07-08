import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AnswersHttpService } from '../answers.http.service';

@Injectable()
export class GetAnswersService {
  private readonly logger = new Logger(GetAnswersService.name);

  constructor(private answersHttpService: AnswersHttpService) {}

  async getAllAnswers() {
    this.logger.log('Fetching all answers');
    return this.answersHttpService.getAllAnswers();
  }

  async getAnswerById(id: number) {
    this.logger.log(`Fetching answer with ID: ${id}`);
    try {
      return await this.answersHttpService.getAnswerById(id);
    } catch (error) {
      this.logger.error(`Answer with ID: ${id} not found`);
      throw new NotFoundException('Answer not found');
    }
  }

  async getAnswersByQuestionId(questionId: number) {
    this.logger.log(`Fetching answers for question ID: ${questionId}`);
    try {
      return await this.answersHttpService.getAnswersByQuestionId(questionId);
    } catch (error) {
      this.logger.error(`Answers for question ID: ${questionId} not found`);
      throw new NotFoundException('Answers not found');
    }
  }

  async getCorrectAnswers(isCorrect: boolean) {
    this.logger.log(`Fetching ${isCorrect ? 'correct' : 'incorrect'} answers`);
    try {
      return await this.answersHttpService.getCorrectAnswers(isCorrect);
    } catch (error) {
      this.logger.error(`Error fetching ${isCorrect ? 'correct' : 'incorrect'} answers`);
      throw new NotFoundException('Answers not found');
    }
  }
}
