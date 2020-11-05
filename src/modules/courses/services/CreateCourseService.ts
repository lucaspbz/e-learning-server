import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ICreateCourseDTO from '../dtos/ICreateCourseDTO';
import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
export default class CreateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) { }

  public async execute(data: ICreateCourseDTO): Promise<Course> {
    const { name } = data;

    const existingCourse = await this.coursesRepository.findByName(name);

    if (existingCourse) {
      throw new AppError('There is already a course with this name');
    }

    const course = await this.coursesRepository.create(data);

    return course;
  }
}
