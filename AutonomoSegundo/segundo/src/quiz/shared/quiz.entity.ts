import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Story } from 'src/story/shared/story.entity';
import { Questions } from 'src/questions/shared/questions.entity';
@ObjectType()
@Entity('Quiz')
export class Quiz {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  difficultyLevel: string;

  @Field()
  @Column({ nullable: false })
  title: string;
  @OneToMany(() => Story, (story) => story.quiz)
  stories: Story[];
  @OneToMany(() => Questions, (questions) => questions.quiz)
  questions: Questions[];
}
