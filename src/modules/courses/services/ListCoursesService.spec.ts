import FakeCourseRepository from '../repositories/fakes/FakeCourseRepository';
import CreateCourseService from './CreateCourseService';
import ListCoursesService from './ListCoursesService';

let listCourses: ListCoursesService;
let fakeCourseRepository: FakeCourseRepository;
let createCourse: CreateCourseService;

describe('List courses', () => {
  beforeEach(() => {
    fakeCourseRepository = new FakeCourseRepository();

    listCourses = new ListCoursesService(fakeCourseRepository);
    createCourse = new CreateCourseService(fakeCourseRepository);
  });

  it('should be able to list created courses', async () => {
    await createCourse.execute({ name: 'Node.js', image: 'image-url' });

    const courses = await listCourses.execute();

    expect(courses).toHaveLength(1);
  });
});
