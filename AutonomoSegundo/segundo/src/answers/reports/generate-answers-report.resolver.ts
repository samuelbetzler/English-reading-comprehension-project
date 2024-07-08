import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GenerateAnswersReportService } from './generate-answers-report.service';

@Resolver('AnswersReport')
export class GenerateAnswersReportResolver {
  constructor(private generateAnswersReportService: GenerateAnswersReportService) {}

  @Mutation(() => String)
  async generateAnswersReport(@Args('id') id: number): Promise<string> {
    await this.generateAnswersReportService.generateAnswersReport(id);
    return `Answers report for question ID ${id} generated successfully`;
  }

  @Mutation(() => String)
  async generateGeneralAnswersReport(): Promise<string> {
    await this.generateAnswersReportService.generateGeneralAnswersReport();
    return `General answers report generated successfully`;
  }
}
