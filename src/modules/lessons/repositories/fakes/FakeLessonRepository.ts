import { uuid } from 'uuidv4';

import ICreateLessonDTO from '@modules/lessons/dtos/ICreateLessonDTO';
import Lesson from '@modules/lessons/infra/typeorm/entities/Lesson';
import ILessonsRepository from '../ILessonsRepository';

export default class FakeLessonRepository implements ILessonsRepository {
  private lessons: Lesson[];

  constructor() {
    this.lessons = [];
  }

  // public async list(): Promise<Lesson[]> {
  //   return this.lessons;
  // }

  public async save(lesson: Lesson): Promise<Lesson> {
    const findIndex = this.lessons.findIndex(
      findLesson => findLesson.id === lesson.id,
    );

    this.lessons[findIndex] = lesson;

    return lesson;
  }

  public async findById(id: string): Promise<Lesson | undefined> {
    const course = this.lessons.find(searchCourse => searchCourse.id === id);

    return course;
  }

  public async create(data: ICreateLessonDTO): Promise<Lesson> {
    const lesson = new Lesson();
    const id = uuid();

    Object.assign(lesson, { id, ...data });

    this.lessons.push(lesson);

    return lesson;
  }

  // public async findByName(name: string): Promise<Lesson | undefined> {
  //   const course = this.lessons.find(
  //     searchCourse => searchCourse.name === name,
  //   );

  //   return course;
  // }
}
