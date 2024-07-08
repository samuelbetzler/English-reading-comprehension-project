import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { QuizModule } from './quiz/quiz.module';
import { ReportsModule } from './reports/reports.module';
import { StoryModule } from './story/story.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
      playground: true,
    }),
    QuizModule,
    StoryModule,
    QuestionsModule,
    AnswersModule,
    ReportsModule,
  ],
})
export class AppModule {}
