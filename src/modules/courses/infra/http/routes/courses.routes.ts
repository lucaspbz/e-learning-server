import CreateCourseService from '@modules/courses/services/CreateCourseService';
import ListCoursesService from '@modules/courses/services/ListCoursesService';
import UpdateCourseService from '@modules/courses/services/UpdateCourseService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';

const coursesRouter = Router();

coursesRouter.get('', async (request: Request, response: Response) => {
  const listCourses = container.resolve(ListCoursesService);

  const courses = await listCourses.execute();
  return response.json(courses);
});

coursesRouter.post(
  '/',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const { name, image } = request.body;

    const createCourse = container.resolve(CreateCourseService);

    const course = await createCourse.execute({ name, image });

    return response.status(201).json(course);
  },
);

coursesRouter.put(
  '/:id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, image } = request.body;

    const updateCourse = container.resolve(UpdateCourseService);

    const course = await updateCourse.execute({
      course_id: id,
      name,
      image,
    });

    return response.json(course);
  },
);

export default coursesRouter;
