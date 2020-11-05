import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';

import CreateLessonService from '@modules/lessons/services/CreateLessonService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

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

export default lessonsRouter;
