import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Course from '../../../../courses/infra/typeorm/entities/Course';

@Entity('lessons')
export default class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  duration: number;

  @ManyToOne(() => Course, course => course.lessons)
  course: Course;

  @Column('uuid')
  course_id: string;

  @Column()
  description: string;

  @Column()
  video_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
