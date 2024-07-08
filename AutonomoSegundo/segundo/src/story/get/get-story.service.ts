import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { StoryHttpService } from '../story.http.service';

@Injectable()
export class GetStoryService {
  private readonly logger = new Logger(GetStoryService.name);

  constructor(private storyHttpService: StoryHttpService) {}

  async getAllStories(): Promise<any> {
    this.logger.log(`Fetching all stories`);
    return this.storyHttpService.getAllStories();
  }

  async getStoryById(id: number): Promise<any> {
    this.logger.log(`Fetching story with ID: ${id}`);
    try {
      return await this.storyHttpService.getStoryById(id);
    } catch (error) {
      this.logger.error(`Story with ID: ${id} not found`);
      throw new NotFoundException('Story not found');
    }
  }
}
