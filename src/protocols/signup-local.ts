import { Protocol, OnVerify, OnInstall } from "@tsed/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import { UserRepository } from "../repositories/user";
import { Req, BodyParams } from "@tsed/common";
import { User } from "../entities/user";
import { Forbidden } from "@tsed/exceptions";

@Protocol<IStrategyOptions>({
  name: "signup",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
  },
})
export class SignUpLocalProtocol implements OnVerify, OnInstall {
  constructor(private readonly userRepository: UserRepository) {}

  async $onVerify(@Req() req: Req, @BodyParams() user: User): Promise<void> {
    const { email } = user;

    const foundUser = await this.userRepository.findOne({ email });

    if (foundUser) {
      throw new Forbidden(`email ${email} is already registered`);
    }

    this.userRepository.save(user);
  }

  async $onInstall(): Promise<void> {
    // todo
  }
}
