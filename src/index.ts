import { Sequelize } from "sequelize-typescript";
import { User, UserSchema } from "./models/user";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST) {
  throw new Error(
    `Expected Database host to not be ${DB_HOST}. Make sure the .env file has the entry for database host URI`
  );
}

if (!DB_USER) {
  throw new Error(
    `Expected Database user to not be ${DB_USER}. Make sure the .env file has the entry for database user name`
  );
}

if (!DB_NAME) {
  throw new Error(
    `Expected Database name to not be ${DB_NAME}. Make sure the .env file has the entry for database name`
  );
}

if (!DB_PASSWORD) {
  throw new Error(
    `Expected Database password to not be ${DB_PASSWORD}. Make sure the .env file has the entry for database password`
  );
}

if (!DB_PORT || isNaN(DB_PORT as any)) {
  throw new Error(
    `Expected Database port to not be ${DB_PORT}. Make sure the .env file has the entry for database port`
  );
}

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

connection.addModels([User]);

const john: UserSchema = {
  firstName: "John",
  lastName: "Doe",
};

(async () => {
  await connection.sync({
    force: true,
    logging: console.log,
  });
  const dbVersion = await connection.databaseVersion();
  console.log(`Database version: ${dbVersion}`);
  const user = await User.create(john);
  console.log(user);
})();
