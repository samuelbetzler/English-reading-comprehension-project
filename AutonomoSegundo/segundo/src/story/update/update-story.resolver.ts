import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UpdateStoryService } from './update-story.service';
import { UpdateStoryInput } from './update-story.input';
import { Story } from '../shared/story.entity';

@Resolver('Story')
export class UpdateStoryResolver {
  constructor(private readonly updateStoryService: UpdateStoryService) {}

  @Mutation(() => Story)
  async updateStory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateStoryInput') updateStoryInput: UpdateStoryInput,
  ): Promise<Story> {
    return this.updateStoryService.updateStory(id, updateStoryInput);
  }
}
