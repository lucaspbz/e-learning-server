import AppError from '@shared/errors/AppError';
import FakeCourseRepository from '../repositories/fakes/FakeCourseRepository';
import CreateCourseService from './CreateCourseService';

let fakeCourseRepository: FakeCourseRepository;
let createCourse: CreateCourseService;

describe('Create course', () => {
  beforeEach(() => {
    fakeCourseRepository = new FakeCourseRepository();

    createCourse = new CreateCourseService(fakeCourseRepository);
  });

  it('should be able to create a course', async () => {
    const course = await createCourse.execute({
      name: 'Node.js',
      image: 'image-path',
    });

    expect(course).toHaveProperty('id');
  });

  it('should not be able to create a course with a existing name', async () => {
    await createCourse.execute({
      name: 'Node.js',
      image: 'image-path',
    });

    await expect(
      createCourse.execute({
        name: 'Node.js',
        image: 'any-img-path',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
