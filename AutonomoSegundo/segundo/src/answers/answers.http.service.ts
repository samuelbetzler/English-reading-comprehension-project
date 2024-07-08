import { Injectable } from '@nestjs/common';
import { BaseHttpService } from '../common/base-http.service';
import { API_URLS } from '../config/api-urls.config';

@Injectable()
export class AnswersHttpService extends BaseHttpService {
  async getAllAnswers() {
    return this.get(API_URLS.ANSWERS, '?relations=question,question.quiz');
  }

  async getAnswerById(id: number) {
    return this.get(`${API_URLS.ANSWERS}/${id}`, '?relations=question,question.quiz');
  }

  async createAnswer(data: any) {
    return this.post(API_URLS.ANSWERS, data);
  }

  async updateAnswer(id: number, data: any) {
    return this.put(API_URLS.ANSWERS, id, data);
  }

  async deleteAnswer(id: number) {
    return this.delete(API_URLS.ANSWERS, id);
  }

  async getAnswersByQuestionId(questionId: number) {
    const allAnswers = await this.get(`${API_URLS.ANSWERS}?relations=question,question.quiz`);
    return allAnswers.filter(answer => answer.questionId === questionId);
  }
  
  async getCorrectAnswers(isCorrect: boolean) {
    try {
      const response = await this.get(`${API_URLS.ANSWERS}?isCorrect=${isCorrect}`);
      return response.data; // Asumiendo que el servicio devuelve un arreglo de respuestas correctas o incorrectas según el valor de isCorrect
    } catch (error) {
      throw new Error(`Error fetching ${isCorrect ? 'correct' : 'incorrect'} answers: ${error.message}`);
    }

}
}
