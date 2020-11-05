import { uuid } from 'uuidv4';

import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO';
import Course from '@modules/courses/infra/typeorm/entities/Course';
import ICoursesRepository from '../ICoursesRepository';

export default class FakeCourseRepository implements ICoursesRepository {
  private courses: Course[];

  constructor() {
    this.courses = [];
  }

  public async create(data: ICreateCourseDTO): Promise<Course> {
    const course = new Course();
    const id = uuid();

    Object.assign(course, { id, ...data });

    this.courses.push(course);

    return course;
  }

  public async findByName(name: string): Promise<Course | undefined> {
    const course = this.courses.find(
      searchCourse => searchCourse.name === name,
    );

    return course;
  }
}
