import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreateQuestionsService } from './create/create-questions.service'; // Ajusta según tus servicios de preguntas
import { UpdateQuestionsService } from './update/update-questions.service'; // Ajusta según tus servicios de preguntas
import { GetQuestionsService } from './get/get-questions.service'; // Ajusta según tus servicios de preguntas
import { DeleteQuestionsService } from './delete/delete-questions.service'; // Ajusta según tus servicios de preguntas
import { CreateQuestionsResolver } from './create/create-questions.resolver'; // Ajusta según tus resolvers de preguntas
import { UpdateQuestionsResolver } from './update/update-questions.resolver'; // Ajusta según tus resolvers de preguntas
import { GetQuestionsResolver } from './get/get-questions.resolver'; // Ajusta según tus resolvers de preguntas
import { DeleteQuestionsResolver } from './delete/delete-questions.resolver'; // Ajusta según tus resolvers de preguntas
import { QuestionsHttpService } from './questions.http.service'; // Ajusta según tus servicios HTTP de preguntas
import { ReportsModule } from '../reports/reports.module'; // Ajusta según la estructura de tu módulo de reportes
import { GenerateQuestionsReportService } from './reports/generate-questions-report.service'; // Ajusta según tus servicios de reportes de preguntas
import { GenerateQuestionsReportResolver } from './reports/generate-questions-report.resolver'; // Ajusta según tus resolvers de reportes de preguntas

@Module({
  imports: [HttpModule, ReportsModule],
  providers: [
    CreateQuestionsService,
    UpdateQuestionsService,
    GetQuestionsService,
    DeleteQuestionsService,
    CreateQuestionsResolver,
    UpdateQuestionsResolver,
    GetQuestionsResolver,
    DeleteQuestionsResolver,
    QuestionsHttpService,
    GenerateQuestionsReportService,
    GenerateQuestionsReportResolver,
  ],
})
export class QuestionsModule {}
