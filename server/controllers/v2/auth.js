/* eslint linebreak-style: ["error", "windows"] */

// Web token
import jwt from "jsonwebtoken";
// encryption
import bcrypt from "bcrypt";
// register envirnoment variables
import dotenv from "dotenv";
// validator
import Joi from "joi";
// Status code
import ST from "../../config/status";
import pool from "../../config/db";
import moment from "moment";
import { stat } from "fs";

dotenv.config();

class Auth {
  static async signup(req, res) {  
    // validate inputs    
    const { error } = validateUser(req.body);
    if (error)
      return res
        .status(ST.BAD_REQUEST)
        .send({ status: ST.BAD_REQUEST, error: error.details[0].message });
    try {
      // hashing the password      
      // generate random data
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
      // create a random data to the password before encrypting
      const hash = await bcrypt.hash(req.body.password, salt);
      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hash,
        email: req.body.email,
        isadmin: true,
        createdon: moment().format("YYYY-MM-DD HH:mm:ss")
      };
      const text =
        "INSERT INTO users( firstname, lastname, email, password, isadmin, createdon) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
      const values = [user.firstname, user.lastname, user.email, user.password, user.isadmin, user.createdon];
      
     await pool.query(text, values)
      .then(response => {
        const verify = bcrypt.compare(hash, req.body.password);
        if (verify) {
          const token = jwt.sign({ user: response.rows[0].id, admin: response.rows[0].isadmin }, process.env.SECRET );
          return res
          .status(ST.CREATED)
          .send({
            status: ST.CREATED,
            token
          });
        } else {
          return res.status(ST.BAD_REQUEST).send({
            status: ST.BAD_REQUEST,
            error: "We could not authethicate you, try login form."
          });
        }
      })
      .catch(e => {
        if(e.routine === "scanner_yyerror") return res.status(ST.BAD_REQUEST).send({ status: ST.BAD_REQUEST, error: "Error in your query occured" });
        if(e.routine === "_bt_check_unique") return res.status(ST.EXIST).send({ status: ST.EXIST, error: " Account already exists "});
        if(e) return res.status(ST.BAD_REQUEST).send({ status: ST.BAD_REQUEST, error: " Error occured "});
      }); 
    } catch (err) {
      res.send({
        message: `Error occured. Try again later`
      });
    }
  }

  static async login(req, res) {
      // validate inputs    
      const { error } = validateLogin(req.body);
      if (error)
        return res
          .status(ST.BAD_REQUEST)
          .send({ status: ST.BAD_REQUEST, error: error.details[0].message });
    
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    pool
    .query(`SELECT * from users where email = $1 LIMIT 1`, [user.email])
    .then(response =>{          
      if(!response.rows || !response.rows[0]) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error:'Sorry, Incorrect email or passowrd.'});     
 
      const admin = response.rows[0].isadmin;
      const verify = bcrypt.compare(user.password, response.rows[0].password);   
      if(verify){
        const token = jwt.sign({ user: response.rows[0].id, admin: admin }, process.env.SECRET );
        return res.status(ST.OK).send({status:ST.OK, data: [token]});
      }else{
          return res.status(401).send({
              message:"Sorry, your password is incorrect."
          })
      }
  }).catch(err =>{
      res.status(ST.BAD_REQUEST).send({ status:ST.BAD_REQUEST, error: "Sorry, Error occured try again"})
  }); 
  }
  // request to reset password
  static async reset(req, res){
    res.send({ status: ST.OK, message: " Feature under construction. Check back soon" })
  }
}
// validate:create user
function validateUser(user) {
  const schema = {
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().min(2).max(30).required(),
    password: Joi.string().min(6).max(15).required()
  };
  return Joi.validate(user, schema);
}

// validate:create user
function validateLogin(user) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required()
  };
  return Joi.validate(user, schema);
}

export default Auth;
