import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreateQuizService } from './create/create-quiz.service';
import { UpdateQuizService } from './update/update-quiz.service';
import { GetQuizService } from './get/get-quiz.service';
import { DeleteQuizService } from './delete/delete-quiz.service';
import { CreateQuizResolver } from './create/create-quiz.resolver';
import { UpdateQuizResolver } from './update/update-quiz.resolver';
import { GetQuizResolver } from './get/get-quiz.resolver';
import { DeleteQuizResolver } from './delete/delete-quiz.resolver';
import { QuizHttpService } from './quiz.http.service';
import { ReportsModule } from '../reports/reports.module';
import { GenerateQuizReportService } from './reports/generate-quiz-report.service';
import { GenerateQuizReportResolver } from './reports/generate-quiz-report.resolver';
@Module({
  imports: [HttpModule, ReportsModule ],
  providers: [
    CreateQuizService,
    UpdateQuizService,
    GetQuizService,
    DeleteQuizService,
    CreateQuizResolver,
    UpdateQuizResolver,
    GetQuizResolver,
    DeleteQuizResolver,
    QuizHttpService,
    GenerateQuizReportService,
    GenerateQuizReportResolver,
  ],
})
export class QuizModule {}

