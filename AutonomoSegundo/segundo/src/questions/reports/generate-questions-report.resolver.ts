import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GenerateQuestionsReportService } from './generate-questions-report.service';

@Resolver('QuestionsReport')
export class GenerateQuestionsReportResolver {
  constructor(private generateQuestionsReportService: GenerateQuestionsReportService) {}

  @Mutation(() => String)
  async generateQuestionsReport(@Args('id') id: number): Promise<string> {
    await this.generateQuestionsReportService.generateQuestionsReport(id);
    return `Questions report for ID ${id} generated successfully`;
  }

  @Mutation(() => String)
  async generateGeneralQuestionsReport(): Promise<string> {
    await this.generateQuestionsReportService.generateGeneralQuestionsReport();
    return `General questions report generated successfully`;
  }
}
