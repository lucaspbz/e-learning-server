import FakeCourseRepository from '@modules/courses/repositories/fakes/FakeCourseRepository';
import CreateCourseService from '@modules/courses/services/CreateCourseService';
import AppError from '@shared/errors/AppError';
import FakeLessonRepository from '../repositories/fakes/FakeLessonRepository';
import CreateLessonService from './CreateLessonService';
import UpdateLessonService from './UpdateLessonService';

let createLesson: CreateLessonService;
let createCourse: CreateCourseService;
let updateLesson: UpdateLessonService;

let fakeLessonsRepository: FakeLessonRepository;
let fakeCoursesRepository: FakeCourseRepository;

describe('Update lesson', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonRepository();
    fakeCoursesRepository = new FakeCourseRepository();

    createLesson = new CreateLessonService(
      fakeLessonsRepository,
      fakeCoursesRepository,
    );
    createCourse = new CreateCourseService(fakeCoursesRepository);
    updateLesson = new UpdateLessonService(
      fakeLessonsRepository,
      fakeCoursesRepository,
    );
  });

  it('should be able to update a lesson', async () => {
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

    const updatedLesson = await updateLesson.execute({
      lesson_id: lesson.id,
      name: 'Another lesson name',
      course_id: course.id,
      description: 'Another lesson description',
      duration: 1000,
      video_id: 'another video-url',
    });

    expect(updatedLesson.name).toBe('Another lesson name');
    expect(updatedLesson.description).toBe('Another lesson description');
    expect(updatedLesson.duration).toBe(1000);
    expect(updatedLesson.video_id).toBe('another video-url');
  });

  it('should not be able to update to a course_id of a non-existing course', async () => {
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

    await expect(
      updateLesson.execute({
        lesson_id: lesson.id,
        name: 'Another lesson name',
        course_id: 'invalid-course-id',
        description: 'Another lesson description',
        duration: 1000,
        video_id: 'another video-url',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
