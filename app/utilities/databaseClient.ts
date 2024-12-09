import { Client } from "pg";

export const DBClient = () => {
  return new Client({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "user_service",
    port: 5432,
  });
};
