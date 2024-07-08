import { Injectable, NotFoundException } from '@nestjs/common';
import { StoryHttpService } from '../story.http.service';
import { UpdateStoryInput } from './update-story.input';

@Injectable()
export class UpdateStoryService {
  constructor(private storyHttpService: StoryHttpService) {}

  async updateStory(id: number, updateStoryInput: UpdateStoryInput): Promise<any> {
    try {
      return await this.storyHttpService.updateStory(id, updateStoryInput);
    } catch (error) {
      throw new NotFoundException('Story not found');
    }
  }
}
