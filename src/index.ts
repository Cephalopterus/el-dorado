import * as ORM from "sequelize";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const connection = new ORM.Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD!, {
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

class User extends ORM.Model {}
User.init(
  {
    // attributes
    firstName: {
      type: ORM.STRING,
      allowNull: false,
    },
    lastName: {
      type: ORM.STRING,
    },
  },
  {
    modelName: "userlogin",
    timestamps: true,
    sequelize: connection,
    // options
  }
);

(async () => {
  await connection.sync({
    force: true,
    logging: console.log,
  });
  const user = await User.create({
    firstName: "John",
    lastName: "Doe",
  });
  console.log(user);
})();
