import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Lesson from '../infra/typeorm/entities/Lesson';

import ILessonsRepository from '../repositories/ILessonsRepository';

interface IRequest {
  lesson_id: string;
  name: string;
  duration: number;
  course_id: string;
  description: string;
  video_id: string;
}

@injectable()
export default class UpdateLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) { }

  public async execute(data: IRequest): Promise<Lesson> {
    const {
      description,
      duration,
      video_id,
      name,
      course_id,
      lesson_id,
    } = data;

    const lesson = await this.lessonsRepository.findById(lesson_id);

    if (!lesson) {
      throw new AppError('No such lesson with this id');
    }

    const foundCourse = await this.coursesRepository.findById(course_id);

    if (!foundCourse) {
      throw new AppError('No such course with this id');
    }

    lesson.description = description;
    lesson.duration = duration;
    lesson.name = name;
    lesson.video_id = video_id;
    lesson.course_id = course_id;

    return this.lessonsRepository.save(lesson);
  }
}
