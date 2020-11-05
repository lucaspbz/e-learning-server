import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Lesson from '../infra/typeorm/entities/Lesson';
import ILessonsRepository from '../repositories/ILessonsRepository';

interface IRequest {
  name: string;
  duration: number;
  course_id: string;
  description: string;
  video_id: string;
}

@injectable()
export default class CreateLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) { }

  public async execute(data: IRequest): Promise<Lesson> {
    const existingCourse = await this.coursesRepository.findById(
      data.course_id,
    );

    if (!existingCourse) {
      throw new AppError('No such course with this id');
    }

    const lesson = await this.lessonsRepository.create(data);

    return lesson;
  }
}
