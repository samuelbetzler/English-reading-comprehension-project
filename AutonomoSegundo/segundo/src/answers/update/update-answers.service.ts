import { Injectable, NotFoundException } from '@nestjs/common';
import { AnswersHttpService } from '../answers.http.service';
import { UpdateAnswersInput } from './update-answers.input';

@Injectable()
export class UpdateAnswersService {
  constructor(private answersHttpService: AnswersHttpService) {}

  async updateAnswers(id: number, updateAnswersInput: UpdateAnswersInput) {
    try {
      return await this.answersHttpService.updateAnswer(id, updateAnswersInput);
    } catch (error) {
      throw new NotFoundException('Answer not found');
    }
  }
}
