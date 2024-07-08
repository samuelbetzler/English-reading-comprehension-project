import { Injectable } from '@nestjs/common';
import { AnswersHttpService } from '../answers.http.service';

@Injectable()
export class DeleteAnswersService {
  constructor(private answersHttpService: AnswersHttpService) {}

  async deleteAnswer(id: number) {
    return this.answersHttpService.deleteAnswer(id);
  }
}