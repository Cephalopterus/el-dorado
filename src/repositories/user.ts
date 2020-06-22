import { EntityRepository } from "@tsed/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: User["email"]): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return user.password === password;
  }
}
