import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import { getRepository, Repository } from 'typeorm';
import Course from '../entities/Course';

export default class CoursesRepository implements ICoursesRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async list(): Promise<Course[]> {
    return this.ormRepository.find();
  }

  public async save(course: Course): Promise<Course> {
    return this.ormRepository.save(course);
  }

  public async findById(id: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne(id);

    return course;
  }

  public async create(data: ICreateCourseDTO): Promise<Course> {
    const course = this.ormRepository.create(data);

    await this.ormRepository.save(course);

    return course;
  }

  public async findByName(name: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne({ where: { name } });

    return course;
  }
}
