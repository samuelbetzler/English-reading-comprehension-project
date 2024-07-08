import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Questions } from '../../questions/shared/questions.entity';

@ObjectType()
@Entity('Answers')
export class Answers {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Questions, { nullable: true })
  @ManyToOne(() => Questions, question => question.answers, { eager: true })
  @JoinColumn({ name: 'questionId' }) // Cambiado a singular
  question: Questions; // Cambiado a singular

  @Column({ nullable: false })
  questionId: number; // Cambiado a singular

  @Field()
  @Column({ nullable: false })
  text: string;

  @Field()
  @Column({ nullable: false })
  isCorrect: boolean;
}
