/* eslint linebreak-style: ["error", "windows"] */
// validator
import Joi from "joi";
import jwt from "jsonwebtoken";
// encryption
import bcrypt from "bcrypt";
// Status code
import ST from "../../config/status";
import pool from "../../config/db";

class Users {
  static me(req, res) {
    pool
    .query(`SELECT  id, firstname, lastname, email, phone, profile, createdon, isadmin  from users where id = $1`, [req.userId])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'This account is not longer active '});
      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: e }));
  }
  static all(req, res) {
    pool
    .query(`SELECT id, firstname, lastname, email, phone, profile, createdon, isadmin from users`)
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'This account is not longer active '});
      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: e }));
  }
}

export default Users;