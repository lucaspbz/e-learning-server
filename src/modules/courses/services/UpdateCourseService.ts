import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

interface IRequest {
  course_id: string;
  name: string;
  image: string;
}

@injectable()
export default class UpdateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) { }

  public async execute(data: IRequest): Promise<Course> {
    const course = await this.coursesRepository.findById(data.course_id);

    if (!course) {
      throw new AppError('There is no such course with this Id');
    }

    if (course.name === data.name) {
      throw new AppError('There is already a course with this name');
    }

    course.image = data.image;
    course.name = data.name;

    return this.coursesRepository.save(course);
  }
}
