import dotenv from "dotenv";

dotenv.config();


// Database URL
const DB = {
  dev: process.env.DEV_DB_URL,
  test: process.env.TEST_DB_URL,
  production: process.env.DATABASE_URL
};

// Status Codes

const ST = {
   OK = 200,
   CREATED = 201,
   NO_CONTENT = 204,
   BAD_REQUEST = 400,
   UNAUTHORIZED = 401,
   FORBIDDED = 403,
   NOT_FOUNT = 404,
   EXIST = 409,

}


export default { ST, DB };
