import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { DeleteStoryService } from './delete-story.service';

@Resolver('Story')
export class DeleteStoryResolver {
  constructor(private readonly deleteStoryService: DeleteStoryService) {}

  @Mutation(() => Boolean)
  async deleteStory(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.deleteStoryService.deleteStory(id);
    return true;
  }
}
