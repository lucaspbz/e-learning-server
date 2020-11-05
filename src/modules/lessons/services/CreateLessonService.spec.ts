import Course from '@modules/courses/infra/typeorm/entities/Course';
import FakeCourseRepository from '@modules/courses/repositories/fakes/FakeCourseRepository';
import CreateCourseService from '@modules/courses/services/CreateCourseService';
import AppError from '@shared/errors/AppError';
import FakeLessonRepository from '../repositories/fakes/FakeLessonRepository';
import CreateLessonService from './CreateLessonService';

let createLesson: CreateLessonService;
let createCourse: CreateCourseService;

let fakeLessonsRepository: FakeLessonRepository;
let fakeCoursesRepository: FakeCourseRepository;

describe('Create lesson', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonRepository();
    fakeCoursesRepository = new FakeCourseRepository();

    createLesson = new CreateLessonService(
      fakeLessonsRepository,
      fakeCoursesRepository,
    );
    createCourse = new CreateCourseService(fakeCoursesRepository);
  });

  it('should be able to create a lesson', async () => {
    const course = await createCourse.execute({
      name: 'Node.js',
      image: 'image-url',
    });
    const lesson = await createLesson.execute({
      name: 'Preparando o ambiente',
      course_id: course.id,
      description: 'Preparando o ambiente de desenvolvimento',
      duration: 4239,
      video_id: 'video-url',
    });

    expect(lesson).toHaveProperty('id');
  });

  it('should not be able to create a lesson with a non-existing/not-valid course_id', async () => {
    await expect(
      createLesson.execute({
        name: 'Preparando o ambiente',
        course_id: 'not-valid-id',
        description: 'Preparando o ambiente de desenvolvimento',
        duration: 4239,
        video_id: 'video-url',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
