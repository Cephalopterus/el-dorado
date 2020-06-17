import {
  Table,
  Model,
  AllowNull,
  Column,
  TableOptions,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  IsUUID,
} from "sequelize-typescript";
import { UUID, UUIDV4 } from "sequelize";

const tableOptions: TableOptions = {
  modelName: "userlogin",
  timestamps: true,
};

export interface BaseSchema {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface UserSchema extends Partial<BaseSchema> {
  firstName: string;
  lastName?: string;
}

@Table(tableOptions)
export class User extends Model<User> implements UserSchema {
  @PrimaryKey
  @IsUUID(4)
  @Column({ type: UUID, defaultValue: UUIDV4 })
  id!: string;

  @AllowNull(false)
  @Column
  firstName!: string;

  @AllowNull(true)
  @Column
  lastName?: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
