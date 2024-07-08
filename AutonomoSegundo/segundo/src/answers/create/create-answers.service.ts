import { Injectable } from '@nestjs/common';
import { AnswersHttpService } from '../answers.http.service';
import { CreateAnswersInput } from './create-answers.input';

@Injectable()
export class CreateAnswersService {
  constructor(private answersHttpService: AnswersHttpService) {}

  async createAnswer(createAnswersInput: CreateAnswersInput) {
    return this.answersHttpService.createAnswer(createAnswersInput);
  }
}
