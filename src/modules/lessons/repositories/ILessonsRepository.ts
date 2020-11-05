import ICreateLessonDTO from '../dtos/ICreateLessonDTO';
import Lesson from '../infra/typeorm/entities/Lesson';

export default interface ILessonsRepository {
  create(data: ICreateLessonDTO): Promise<Lesson>;
  findById(id: string): Promise<Lesson | undefined>;
  save(lesson: Lesson): Promise<Lesson>;
}
