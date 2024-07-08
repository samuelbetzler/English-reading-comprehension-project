import { Injectable } from '@nestjs/common';
import { BaseHttpService } from '../common/base-http.service';
import { API_URLS } from '../config/api-urls.config';

@Injectable()
export class QuestionsHttpService extends BaseHttpService {
  async getAllQuestions() {
    return this.get(API_URLS.QUESTIONS);
  }

  async getQuestionById(id: number) {
    return this.get(`${API_URLS.QUESTIONS}/${id}`);
  }

  async createQuestion(data: any) {
    return this.post(API_URLS.QUESTIONS, data);
  }

  async updateQuestion(id: number, data: any) {
    return this.put(API_URLS.QUESTIONS, id, data);
  }

  async deleteQuestion(id: number) {
    return this.delete(API_URLS.QUESTIONS, id);
  }

  // Implementa otros métodos específicos de Quiz si es necesario
}