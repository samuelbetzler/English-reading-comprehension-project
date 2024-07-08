import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GenerateStoryReportService } from './generate-story-report.service';

@Resolver('StoryReport')
export class GenerateStoryReportResolver {
  constructor(private generateStoryReportService: GenerateStoryReportService) {}

  @Mutation(() => String)
  async generateStoryReport(@Args('id') id: number): Promise<string> {
    await this.generateStoryReportService.generateStoryReport(id);
    return `Story report for ID ${id} generated successfully`;
  }

  @Mutation(() => String)
  async generateGeneralStoryReport(): Promise<string> {
    await this.generateStoryReportService.generateGeneralStoryReport();
    return `General story report generated successfully`;
  }
}
