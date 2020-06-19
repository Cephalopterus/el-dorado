import {
  Controller,
  Get,
  PathParams,
  Post,
  BodyParams,
  $log,
} from "@tsed/common";
import { UserSchema } from "../models/user";
import { UserRepository } from "../repositories/user";
import { inspect } from "util";
import { User } from "../entities/user";

interface IUser {
  id: number;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}

@Controller("/user")
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async createUser(@BodyParams() user: UserSchema): Promise<User> {
    $log.info(inspect(user));
    $log.info(this.userRepository);
    return this.userRepository.save(user);
  }

  @Get()
  async getUsers(): Promise<UserSchema[]> {
    return this.userRepository.find();
  }

  @Get("/:id")
  async getUserById(@PathParams("id") id: string): Promise<IUser> {
    return {
      id: Number(id),
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
    };
  }
}
