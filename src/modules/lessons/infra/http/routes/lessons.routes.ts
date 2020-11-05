import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';

import CreateLessonService from '@modules/lessons/services/CreateLessonService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UpdateLessonService from '@modules/lessons/services/UpdateLessonService';

const lessonsRouter = Router();

lessonsRouter.post(
  '/',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const { name, video_id, duration, description, course_id } = request.body;

    const createLesson = container.resolve(CreateLessonService);

    const lesson = await createLesson.execute({
      name,
      video_id,
      duration,
      description,
      course_id,
    });

    return response.json(lesson);
  },
);

lessonsRouter.put(
  '/:id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const { name, duration, course_id, description, video_id } = request.body;

    const updateLesson = container.resolve(UpdateLessonService);

    const lesson = await updateLesson.execute({
      lesson_id: id,
      name,
      duration,
      course_id,
      description,
      video_id,
    });

    return response.json(lesson);
  },
);

export default lessonsRouter;
