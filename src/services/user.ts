import { Service, AfterRoutesInit } from "@tsed/common";
import { UserSchema as User } from "../models/user";
import { Connection } from "typeorm";
import { TypeORMService } from "@tsed/typeorm";

@Service()
export class UserService implements AfterRoutesInit {
  private readonly users: User[] = [];
  private connection: Connection;

  constructor(private typeORMService: TypeORMService) {}

  create(user: User): void {
    this.users.push(user);
  }

  findAll(): Array<User> {
    return this.users;
  }
  $afterRoutesInit(): void | Promise<any> {
    /**
     * Retrieve postgres connection
     * After routes have been initialized
     */
    this.connection = this.typeORMService.get("default");
  }
}
