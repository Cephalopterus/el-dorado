import { Format, Default } from "@tsed/common";
import "@tsed/ajv";

export class BaseSchema {
  @Format("date-time")
  @Default(Date.now)
  createdAt?: Date;

  @Format("date-time")
  @Default(Date.now)
  updatedAt?: Date;

  @Format("date-time")
  @Default("")
  deletedAt?: Date;
}
