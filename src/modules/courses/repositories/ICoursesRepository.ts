import ICreateCourseDTO from '../dtos/ICreateCourseDTO';
import Course from '../infra/typeorm/entities/Course';

export default interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course>;

  findByName(name: string): Promise<Course | undefined>;
}
