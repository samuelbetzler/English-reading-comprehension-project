import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StoryHttpService } from './story.http.service';
import { CreateStoryService } from './create/create-story.service';
import { UpdateStoryService } from './update/update-story.service';
import { GetStoryService } from './get/get-story.service';
import { DeleteStoryService } from './delete/delete-story.service';
import { CreateStoryResolver } from './create/create-story.resolver';
import { UpdateStoryResolver } from './update/update-story.resolver';
import { GetStoryResolver } from './get/get-story.resolver';
import { DeleteStoryResolver } from './delete/delete-story.resolver';
import { ReportsModule } from '../reports/reports.module';
import { GenerateStoryReportService } from './reports/generate-story-report.service';
import { GenerateStoryReportResolver } from './reports/generate-story-report.resolver';

@Module({
  imports: [HttpModule, ReportsModule],
  providers: [
    StoryHttpService,
    CreateStoryService,
    UpdateStoryService,
    GetStoryService,
    DeleteStoryService,
    CreateStoryResolver,
    UpdateStoryResolver,
    GetStoryResolver,
    DeleteStoryResolver,
    GenerateStoryReportService,
    GenerateStoryReportResolver,
  ],
})
export class StoryModule {}
