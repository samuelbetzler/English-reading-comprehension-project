import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GetStoryService } from './get-story.service';
import { Story } from '../shared/story.entity';

@Resolver('Story')
export class GetStoryResolver {
  constructor(private readonly getStoryService: GetStoryService) {}

  @Query(() => [Story])
  async stories(): Promise<Story[]> {
    return this.getStoryService.getAllStories();
  }

  @Query(() => Story)
  async story(@Args('id', { type: () => Int }) id: number): Promise<Story> {
    return this.getStoryService.getStoryById(id);
  }
}
