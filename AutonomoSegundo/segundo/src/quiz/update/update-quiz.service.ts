import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizHttpService } from '../quiz.http.service';
import { UpdateQuizInput } from './update-quiz.input';

@Injectable()
export class UpdateQuizService {
  constructor(private quizHttpService: QuizHttpService) {}

  async updateQuiz(id: number, updateQuizInput: UpdateQuizInput) {
    try {
      return await this.quizHttpService.updateQuiz(id, updateQuizInput);
    } catch (error) {
      throw new NotFoundException('Quiz not found');
    }
  }
}
