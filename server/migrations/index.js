// import "./1-users";
import pg from "pg";
// import pool from "../config/database";

const env =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev"
    ? `_${process.env.NODE_ENV}`
    : "";

const pool = new pg.Pool({
  connectionString: "postgres://gilles:123123@localhost:5432/epicdev"
});

// Conect database
pool.on("connect", () => {
  console.log("connected to the Database!");
});

const drop = () => {
  const usersTable = "DROP TABLE IF EXISTS users CASCADE";
  const messagesTable = "DROP TABLE IF EXISTS messages CASCADE";
  const inboxTable = "DROP TABLE IF EXISTS inbox CASCADE";
  const sentTable = "DROP TABLE IF EXISTS sent CASCADE";
  const groupsTable = "DROP TABLE IF EXISTS groups CASCADE";
  const groupMemberTable = "DROP TABLE IF EXISTS groupMembers CASCADE";
  const smsTable = "DROP TABLE IF EXISTS sms CASCADE";
  const resetCode = "DROP TABLE IF EXISTS resetCode CASCADE";
  const dropQueries = `${usersTable};${messagesTable};${inboxTable};${sentTable};${sentTable};${groupsTable};${groupMemberTable};${smsTable};${resetCode}`;

  pool
    .query(dropQueries)
    .then(res => {
      console.log("All database tables have been dropped successfully!");
      pool.end();
    })
    .catch(err => {
      console.log("Whooch, Erro occured with your sql queries");
      pool.end();
    });
  pool.on("remove", () => {
    console.log("Postgres client removed");
    process.exit(0);
  });
  //   pool
  //     .query(dropQueries)
  //     .then(res => {
  //       console.log(res);
  //       pool.end();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       pool.end();
  //     });
  //   pool.on("error", (err, client) => {
  //     console.error("Unexpected error on idle client", err);
  //     process.exit(-1);
  //   });
};

const create = () => {
  // user table
  const usersTable = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" INTEGER NOT NULL,
    "profile" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAdmin" BOOLEAN DEFAULT FALSE
  )`;
  // message table
  const messagesTable = `CREATE TABLE IF NOT EXISTS
  messages(
    id SERIAL PRIMARY KEY,
    "subject" VARCHAR(50) NOT NULL,
    "message" VARCHAR(1600) NOT NULL,
    "profile" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "parentMessageId" INTEGER DEFAULT 0,
    "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  // inbox table
  const inboxTable = `CREATE TABLE IF NOT EXISTS
  inbox(
    id SERIAL PRIMARY KEY,
    "receiverId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  // sent table
  const sentTable = `CREATE TABLE IF NOT EXISTS
  sent(
    id SERIAL PRIMARY KEY,
    "receiverId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  // group table
  const groupTable = `CREATE TABLE IF NOT EXISTS
  groups(
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(600) NOT NULL,
    "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  // group member table
  const groupMembersTable = `CREATE TABLE IF NOT EXISTS
  groupMembers(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "userRole" VARCHAR(60) NOT NULL,
    "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  // SMS table
  const smsTable = `CREATE TABLE IF NOT EXISTS
  sms(
    id SERIAL PRIMARY KEY,
    "receiverPhone" INTEGER NOT NULL,
    "message" VARCHAR(150) NOT NULL,
    "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  // Reset Password Code table
  const resetCodeTable = `CREATE TABLE IF NOT EXISTS
  resetCode(
    id SERIAL PRIMARY KEY,
    "phone" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" VARCHAR(150) NOT NULL,
    "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

  const migrationQueries = `${usersTable};${messagesTable};${smsTable};${inboxTable};${sentTable};${groupTable};${groupMembersTable};${resetCodeTable}`;
  pool.query(`${migrationQueries}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database migration successfully executed!");
    }
    pool.end();
  });
};

export { drop, create, pool };

// eslint-disable-next-line eol-last
require("make-runnable/custom")({
  printOutputFrame: false
});
