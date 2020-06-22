import { Protocol, OnVerify, OnInstall } from "@tsed/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import { Req, BodyParams } from "@tsed/common";
import { Credentials } from "../models/credential";
import { UserRepository } from "../repositories/user";
import { User } from "../entities/user";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
  },
})
export class LoginLocalProtocol implements OnVerify, OnInstall {
  constructor(private readonly userRepository: UserRepository) {}

  async $onVerify(
    @Req() request: Req,
    @BodyParams() credentials: Credentials
  ): Promise<boolean | User> {
    const { email, password } = credentials;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return false;
    }

    if (!this.userRepository.verifyPassword(user, password)) {
      return false;
    }

    return user;
  }

  async $onInstall(strategy: Strategy): Promise<void> {
    // todo
  }
}
