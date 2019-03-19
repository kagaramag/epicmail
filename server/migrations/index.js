/* eslint linebreak-style: ["error", "windows"] */
import pg from "pg";

import pool from "../config/db";

// Conect database
pool.on("connect",(err, res) => {
  console.log("Connected")
});

const drop = () => {
  const usersTable = "DROP TABLE IF EXISTS users CASCADE";
  const messagesTable = "DROP TABLE IF EXISTS messages CASCADE";
  const groupsTable = "DROP TABLE IF EXISTS groups CASCADE";
  const groupMemberTable = "DROP TABLE IF EXISTS groupMembers CASCADE";
  const smsTable = "DROP TABLE IF EXISTS sms CASCADE";
  const resetCode = "DROP TABLE IF EXISTS resetCode CASCADE";
  const dropTables = `${usersTable};${messagesTable};${groupsTable};${groupMemberTable};${smsTable};${resetCode}`;

  pool.query(`${dropTables}`, err => {
    if(err){
      console.log(err);
    } else {
      console.log("All database tables have been dropped successfully!");
    }
    pool.end();
  });
};

const truncate = () => {
  const messagesTable = "TRUNCATE table messages restart identity";
  const truncateTables = `${messagesTable};`;

  pool.query(`${truncateTables}`, err => {
    if(err){
      console.log(err);
    } else {
      console.log("Tables truncated");
    }
    pool.end();
  });
};

const create = () => {
  // user table
  const usersTable = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) UNIQUE NOT NULL,
    "phone" INTEGER UNIQUE NULL,
    "profile" TEXT NULL,
    "password" TEXT NOT NULL,
    "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isadmin" BOOLEAN DEFAULT FALSE
  )`;
  // message table
  const messagesTable = `CREATE TABLE IF NOT EXISTS
  messages(
    id SERIAL PRIMARY KEY,
    "subject" VARCHAR(50) NOT NULL,
    "message" VARCHAR(1600) NOT NULL,
    "status" TEXT NULL,
    "senderid" INTEGER NULL,
    "receiverid" INTEGER NULL,
    "groupid" INTEGER NULL,
    "parentmessageid" INTEGER DEFAULT 0,
    "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_senderid FOREIGN KEY (senderid) REFERENCES users (id),
    CONSTRAINT fk_receiverid FOREIGN KEY (receiverid) REFERENCES users (id)
  )`;
  // group table
  const groupTable = `CREATE TABLE IF NOT EXISTS
  groups(
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(600) UNIQUE NOT NULL,
    "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  // group member table
  const groupMembersTable = `CREATE TABLE IF NOT EXISTS
  groupMembers(
    id SERIAL PRIMARY KEY,
    "userid" INTEGER NOT NULL,
    "groupid" INTEGER NOT NULL,
    "userrole" VARCHAR(60) NOT NULL,
    "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_groupid FOREIGN KEY (groupid) REFERENCES groups (id),
    CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES users (id)
  )`;
  // SMS table
  const smsTable = `CREATE TABLE IF NOT EXISTS
  sms(
    id SERIAL PRIMARY KEY,
    "receiverphone" INTEGER NOT NULL,
    "message" VARCHAR(150) NOT NULL,
    "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  // Reset Password Code table
  const resetCodeTable = `CREATE TABLE IF NOT EXISTS
  resetCode(
    id SERIAL PRIMARY KEY,
    "phone" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "message" VARCHAR(150) NOT NULL,
    "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

  const migrationQueries = `${usersTable};${messagesTable};${smsTable};${groupTable};${groupMembersTable};${resetCodeTable}`;
  pool.query(`${migrationQueries}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database migration successfully executed!");
    }
    pool.end();
  });
};

export { drop, create, truncate, pool };

// eslint-disable-next-line eol-last
require("make-runnable/custom")({
  printOutputFrame: false
});
