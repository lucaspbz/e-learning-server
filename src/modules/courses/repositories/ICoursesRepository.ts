import ICreateCourseDTO from '../dtos/ICreateCourseDTO';
import Course from '../infra/typeorm/entities/Course';

export default interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course>;

  findByName(name: string): Promise<Course | undefined>;

  findById(id: string): Promise<Course | undefined>;

  save(course: Course): Promise<Course>;

  list(): Promise<Course[]>;
}
