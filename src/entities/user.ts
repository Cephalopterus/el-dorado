import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from "typeorm";
import { UserSchema } from "../models/user";
import { MaxLength, Required, MinLength } from "@tsed/common";
import { IsEmail } from "class-validator";

const FIRSTNAME_MAX_LENGTH = 200;
const LASTNAME_MAX_LENGTH = 200;
const MIDDLENAME_MAX_LENGTH = 200;

@Entity()
export class User extends UserSchema {
  @PrimaryGeneratedColumn("increment")
  @PrimaryColumn()
  id: number;

  @MaxLength(FIRSTNAME_MAX_LENGTH)
  @MinLength(1)
  @Required()
  @Column({ length: FIRSTNAME_MAX_LENGTH })
  firstName: string;

  @MaxLength(LASTNAME_MAX_LENGTH)
  @MinLength(1)
  @Required()
  @Column({ length: LASTNAME_MAX_LENGTH })
  lastName: string;

  @MaxLength(MIDDLENAME_MAX_LENGTH)
  @MinLength(0)
  @Column({ length: MIDDLENAME_MAX_LENGTH, nullable: true })
  middleName?: string;

  @IsEmail()
  @Column({ unique: true, type: "text" })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
