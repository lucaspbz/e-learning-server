import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';
import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';

const sessionRouter = Router();
sessionRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const authenticateUser = container.resolve(AuthenticateUserService);

  const { token, user } = await authenticateUser.execute({ email, password });

  response.json({ token, user: classToClass(user) });
});

export default sessionRouter;
