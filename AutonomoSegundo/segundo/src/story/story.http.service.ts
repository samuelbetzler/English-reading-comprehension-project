import { Injectable } from '@nestjs/common';
import { BaseHttpService } from '../common/base-http.service';
import { API_URLS } from '../config/api-urls.config';

@Injectable()
export class StoryHttpService extends BaseHttpService {
  async getAllStories() {
    return this.get(API_URLS.STORIES);
  }

  async getStoryById(id: number) {
    return this.get(`${API_URLS.STORIES}/${id}`);
  }

  async createStory(data: any) {
    return this.post(API_URLS.STORIES, data);
  }

  async updateStory(id: number, data: any) {
    return this.put(API_URLS.STORIES, id, data);
  }

  async deleteStory(id: number) {
    return this.delete(API_URLS.STORIES, id);
  }

  // Implementa otros métodos específicos de Quiz si es necesario
}