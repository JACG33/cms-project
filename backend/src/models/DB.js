import { Sequelize } from "sequelize";
import { config } from "dotenv";
config({ path: "./.env" });

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  timezone: "-04:00",
});