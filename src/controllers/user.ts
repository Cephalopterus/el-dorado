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
import { User } from "../entities/user";
import { BadRequest } from "@tsed/exceptions";

@Controller("/user")
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async createUser(@BodyParams() user: UserSchema): Promise<User> {
    /**
     * check if email exists
     * Insert only if non-existent
     */
    const userWithExistingEmail = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userWithExistingEmail) {
      throw new BadRequest(`User with email ID ${user.email} already exists`);
    }
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
