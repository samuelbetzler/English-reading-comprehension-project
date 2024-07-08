import { Injectable } from '@nestjs/common';
import { StoryHttpService } from '../story.http.service';

@Injectable()
export class DeleteStoryService {
  constructor(private storyHttpService: StoryHttpService) {}

  async deleteStory(id: number): Promise<void> {
    await this.storyHttpService.deleteStory(id);
  }
}
