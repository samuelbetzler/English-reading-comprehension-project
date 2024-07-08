import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreateAnswersService } from './create/create-answers.service';
import { UpdateAnswersService } from './update/update-answers.service';
import { GetAnswersService } from './get/get-answers.service';
import { DeleteAnswersService } from './delete/delete-answers.service';
import { CreateAnswersResolver } from './create/create-answers.resolver';
import { UpdateAnswersResolver } from './update/update-answers.resolver';
import { GetAnswersResolver } from './get/get-answers.resolver';
import { DeleteAnswersResolver } from './delete/delete-answers.resolver';
import { AnswersHttpService } from './answers.http.service';
import { ReportsModule } from '../reports/reports.module';
import { GenerateAnswersReportService } from './reports/generate-answers-report.service';
import { GenerateAnswersReportResolver } from './reports/generate-answers-report.resolver';

@Module({
  imports: [HttpModule, ReportsModule],
  providers: [
    CreateAnswersService,
    UpdateAnswersService,
    GetAnswersService,
    DeleteAnswersService,
    CreateAnswersResolver,
    UpdateAnswersResolver,
    GetAnswersResolver,
    DeleteAnswersResolver,
    AnswersHttpService,
    GenerateAnswersReportService,
    GenerateAnswersReportResolver,
  ],
})
export class AnswersModule {}
