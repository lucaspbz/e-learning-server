import { classToClass } from 'class-transformer';
import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({ name, email, password });

  return response.status(201).json(classToClass(user));
});

export default usersRouter;
