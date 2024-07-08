import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Quiz } from '../../quiz/shared/quiz.entity'; // Corrected import path
import { Answers } from 'src/answers/shared/answers.entity';

@ObjectType()
@Entity('Questions')
export class Questions {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Quiz) // Cambia el tipo de campo a la entidad Quiz
  @ManyToOne(() => Quiz, quiz => quiz.questions)
  @JoinColumn({ name: 'quizId' }) // Asegúrate de que 'quizId' sea el nombre correcto de la columna en la tabla Story
  quiz: Quiz;

  @Column({ nullable: false })
  quizId: number; // Este es el atributo que se mapea con 'quizId' en la base de datos


  @Field(() => [Answers]) // Cambiado a array de Answers
  @OneToMany(() => Answers, answers => answers.question)
  answers: Answers[];

  @Field()
  @Column({ nullable: false })
  text: string;
}
