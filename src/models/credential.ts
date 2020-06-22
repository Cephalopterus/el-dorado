import { Description, Example } from "@tsed/swagger";
import { Required, Format } from "@tsed/common";

export class Credentials {
  @Description("User email ID")
  @Example("test@example.com")
  @Format("email")
  @Required()
  email: string;

  @Description("User password")
  @Example("LoTy8%KDKgS!r")
  @Required()
  password: string;
}
