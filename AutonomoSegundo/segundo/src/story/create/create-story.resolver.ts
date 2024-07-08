import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateStoryService } from './create-story.service';
import { CreateStoryInput } from './create-story.input';
import { Story } from '../shared/story.entity';

@Resolver('Story')
export class CreateStoryResolver {
  constructor(private readonly createStoryService: CreateStoryService) {}

  @Mutation(() => Story)
  async createStory(@Args('createStoryInput') createStoryInput: CreateStoryInput): Promise<Story> {
    return this.createStoryService.createStory(createStoryInput);
  }
}
