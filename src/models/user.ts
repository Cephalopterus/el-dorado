import {
  UniqueItems,
  Email,
  Pattern,
  Default,
  IgnoreProperty,
} from "@tsed/common";
import { BaseSchema } from "./base";

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

  @IgnoreProperty()
  password: string;
}
