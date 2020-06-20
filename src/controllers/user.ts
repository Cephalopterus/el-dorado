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
  async getUserById(@PathParams("id") id: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }
}
