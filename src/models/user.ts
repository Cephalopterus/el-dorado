import { UniqueItems, Email, Pattern, Default } from "@tsed/common";
import { BaseSchema } from "./base";
import "@tsed/ajv";

const nameRegEx = /[a-zA-Z]/;

export class UserSchema extends BaseSchema {
  @UniqueItems(true)
  id: number;

  @UniqueItems(true)
  @Email()
  email: string;

  @Pattern(nameRegEx)
  firstName: string;

  @Pattern(nameRegEx)
  lastName: string;

  @Pattern(nameRegEx)
  @Default("")
  middleName?: string;
}
