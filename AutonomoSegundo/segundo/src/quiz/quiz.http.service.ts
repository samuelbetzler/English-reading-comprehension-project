import { Injectable } from '@nestjs/common';
import { BaseHttpService } from '../common/base-http.service';
import { API_URLS } from '../config/api-urls.config';

@Injectable()
export class QuizHttpService extends BaseHttpService {
  async getAllQuizzes() {
    return this.get(API_URLS.QUIZZES);
  }

  async getQuizById(id: number) {
    return this.get(`${API_URLS.QUIZZES}/${id}`);
  }

  async createQuiz(data: any) {
    return this.post(API_URLS.QUIZZES, data);
  }

  async updateQuiz(id: number, data: any) {
    return this.put(API_URLS.QUIZZES, id, data);
  }

  async deleteQuiz(id: number) {
    return this.delete(API_URLS.QUIZZES, id);
  }

  // Implementa otros métodos específicos de Quiz si es necesario
}