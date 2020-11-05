import { getRepository, Repository } from 'typeorm';

import ICreateLessonDTO from '@modules/lessons/dtos/ICreateLessonDTO';
import ILessonsRepository from '@modules/lessons/repositories/ILessonsRepository';
import Lesson from '../entities/Lesson';

export default class LessonsRepository implements ILessonsRepository {
  private ormRepository: Repository<Lesson>;

  constructor() {
    this.ormRepository = getRepository(Lesson);
  }

  public async create(data: ICreateLessonDTO): Promise<Lesson> {
    const lesson = this.ormRepository.create(data);

    await this.ormRepository.save(lesson);

    return lesson;
  }
}
