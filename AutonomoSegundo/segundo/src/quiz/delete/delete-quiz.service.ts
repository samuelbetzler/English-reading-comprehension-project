import { Injectable } from '@nestjs/common';
import { QuizHttpService } from '../quiz.http.service';

@Injectable()
export class DeleteQuizService {
  constructor(private quizHttpService: QuizHttpService) {}

  async deleteQuiz(id: number) {
    return this.quizHttpService.deleteQuiz(id);
  }
}
