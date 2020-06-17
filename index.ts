import * as Sequelize from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

console.log("===============================================");
console.log(DB_HOST);
console.log(DB_PORT);
console.log(DB_NAME);
console.log(DB_USER);
console.log(DB_PASSWORD);
console.log("===============================================");

const connection = new Sequelize.Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD!, {
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

const Article = connection.define("article", {
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
});

connection.sync({
  logging: console.log,
});
