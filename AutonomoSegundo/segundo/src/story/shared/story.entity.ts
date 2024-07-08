import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Quiz } from '../../quiz/shared/quiz.entity'; // Importa la entidad Quiz

@ObjectType()
@Entity('Story')
export class Story {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  title: string;

  @Field()
  @Column({ nullable: false })
  author: string;

  @Field()
  @Column({ nullable: false })
  text: string;

  @Field(() => Quiz) // Cambia el tipo de campo a la entidad Quiz
  @ManyToOne(() => Quiz, quiz => quiz.stories)
  @JoinColumn({ name: 'quizId' }) // Asegúrate de que 'quizId' sea el nombre correcto de la columna en la tabla Story
  quiz: Quiz;

  @Column({ nullable: false })
  quizId: number; // Este es el atributo que se mapea con 'quizId' en la base de datos
}
