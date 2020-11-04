import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(data: ICreateUserDTO): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError('User already exists!');
    }

    const user = await this.usersRepository.create(data);

    return user;
  }
}
