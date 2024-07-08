import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GenerateQuizReportService } from './generate-quiz-report.service';

@Resolver('QuizReport')
export class GenerateQuizReportResolver {
  constructor(private generateQuizReportService: GenerateQuizReportService) {}

  @Mutation(() => String)
  async generateQuizReport(@Args('id') id: number): Promise<string> {
    await this.generateQuizReportService.generateQuizReport(id);
    return `Quiz report for ID ${id} generated successfully`;
  }

  @Mutation(() => String)
  async generateGeneralQuizReport(): Promise<string> {
    await this.generateQuizReportService.generateGeneralQuizReport();
    return `General quiz report generated successfully`;
  }
}
