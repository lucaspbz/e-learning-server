import AppError from '@shared/errors/AppError';
import FakeCourseRepository from '../repositories/fakes/FakeCourseRepository';
import CreateCourseService from './CreateCourseService';
import UpdateCourseService from './UpdateCourseService';

let fakeCoursesRepository: FakeCourseRepository;

let updateCourse: UpdateCourseService;
let createCourse: CreateCourseService;

describe('Update course', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCourseRepository();

    createCourse = new CreateCourseService(fakeCoursesRepository);
    updateCourse = new UpdateCourseService(fakeCoursesRepository);
  });

  it('should be able to update a course', async () => {
    const course = await createCourse.execute({
      name: 'Node.js',
      image: 'image-path',
    });

    await updateCourse.execute({
      course_id: course.id,
      name: 'React-native',
      image: 'react-native-image-path',
    });

    expect(course.name).toBe('React-native');
    expect(course.image).toBe('react-native-image-path');
  });

  it('should not be able to update a non-existing course', async () => {
    await expect(
      updateCourse.execute({
        course_id: 'non-valid-id',
        name: 'React-native',
        image: 'react-native-image-path',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a course to a name that already exists', async () => {
    const course = await createCourse.execute({
      name: 'Node.js',
      image: 'image-path',
    });

    await expect(
      updateCourse.execute({
        course_id: course.id,
        name: 'Node.js',
        image: 'image-path',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
