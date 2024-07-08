import { Injectable } from '@nestjs/common';
import { StoryHttpService } from '../story.http.service';
import { CreateStoryInput } from './create-story.input';
import { Story } from '../shared/story.entity';

@Injectable()
export class CreateStoryService {
  constructor(private storyHttpService: StoryHttpService) {}

  async createStory(createStoryInput: CreateStoryInput): Promise<Story> {
    return this.storyHttpService.createStory(createStoryInput);
  }
}
