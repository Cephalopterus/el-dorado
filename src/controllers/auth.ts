import {
  Controller,
  Scope,
  ProviderScope,
  Post,
  Req,
  BodyParams,
  Status,
} from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import { Returns, Responses } from "@tsed/swagger";
import { User } from "../entities/user";

@Controller("/auth")
@Scope(ProviderScope.SINGLETON)
export class AuthController {
  @Post("/login")
  @Authenticate("login", { failWithError: false })
  @Returns(User)
  @Responses(400, { description: "Validation Error" })
  async login(
    @Req() req: Req,
    @BodyParams("email") email: string,
    @BodyParams("password") password: string
  ): Promise<Express.User | undefined> {
    // FACADE
    return req.user;
  }

  @Post("/signup")
  @Status(201)
  @Authenticate("signup")
  @Returns(User)
  async signup(
    @Req() req: Req,
    @BodyParams() user: User
  ): Promise<Express.User | undefined> {
    // FACADE
    return req.user;
  }
}
