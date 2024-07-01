import { Injectable } from '@nestjs/common';
import { QuizHttpService } from '../quiz.http.service';
import { CreateQuizInput } from './create-quiz.input';

@Injectable()
export class CreateQuizService {
  constructor(private quizHttpService: QuizHttpService) {}

  async createQuiz(CreateQuizInput: CreateQuizInput) {
    return this.quizHttpService.createQuiz(CreateQuizInput);
  }
}