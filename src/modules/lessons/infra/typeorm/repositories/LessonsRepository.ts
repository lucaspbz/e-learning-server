import { getRepository, Repository } from 'typeorm';

import ICreateLessonDTO from '@modules/lessons/dtos/ICreateLessonDTO';
import ILessonsRepository from '@modules/lessons/repositories/ILessonsRepository';
import Lesson from '../entities/Lesson';

export default class LessonsRepository implements ILessonsRepository {
  private ormRepository: Repository<Lesson>;

  constructor() {
    this.ormRepository = getRepository(Lesson);
  }

  public async findById(id: string): Promise<Lesson | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async save(lesson: Lesson): Promise<Lesson> {
    return this.ormRepository.save(lesson);
  }

  public async create(data: ICreateLessonDTO): Promise<Lesson> {
    const lesson = this.ormRepository.create(data);

    await this.ormRepository.save(lesson);

    return lesson;
  }
}
