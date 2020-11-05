import { uuid } from 'uuidv4';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../../entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(searchUser => searchUser.email === email);

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    const id = uuid();

    Object.assign(user, { id, ...data });

    this.users.push(user);

    return user;
  }
}
