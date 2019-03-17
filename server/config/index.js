import dotenv from "dotenv";
dotenv.config();

const database = process.env.DEV_DB_URL_LOCAL

export default { database};
