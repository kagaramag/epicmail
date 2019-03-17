/* eslint linebreak-style: ["error", "windows"] */
// encryption
// Web token
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// register envirnoment variables
import dotenv from "dotenv";
// validator
import Joi from "joi";
// Status code
import ST from "../../config/status";
import pool from "../../config/db";

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
        email: `${req.body.username}@epicmail.com`,
        isadmin: false
      };
      const text =
        "INSERT INTO users( firstname, lastname, email, password, isadmin) VALUES($1, $2, $3, $4, $5) RETURNING *";
      const values = [user.firstname, user.lastname, user.email, user.password, user.isadmin];
      
     await pool.query(text, values)
      .then(response => {
        const admin = response.rows[0].isadmin;
        const verify = bcrypt.compare(hash, req.body.password);
        if (verify) {
          const token = jwt.sign({ user: user.id, admin: admin }, process.env.SECRET );
          return res
          .status(ST.CREATED)
          .send({
            status: ST.CREATED,
            data: [
              {
                token: token
              }
            ]
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
        if(e.routine === "_bt_check_unique") return res.status(ST.EXIST).send({ status: ST.EXIST, error:e.detail});
        if(e) return res.status(ST.BAD_REQUEST).send({ status: ST.BAD_REQUEST, error:e});
      }); 
    } catch (err) {
      res.send({
        message: `Whoochs, Error occured. Try again later`
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
      if(!response.rows || !response.rows[0]) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error:'Account not exist'});     
      const { userId } = response.rows[0].id;      
      const admin = response.rows[0].isadmin;
      const verify = bcrypt.compare(user.password, response.rows[0].password)
      if(verify){
        const token = jwt.sign({ user: user.id, admin: admin }, process.env.SECRET );
        return res.status(ST.OK).send({status:ST.OK, data: [token]});
      }else{
          return res.status(401).send({
              message:"Sorry, your password is incorrect."
          })
      }
  }).catch(err =>{
      console.log(err.stack);
      res.status(ST.BAD_REQUEST).send({ status:ST.BAD_REQUEST, error: e.stack})
  }); 
  }
  // request to reset password
  static async reset(req, res){
    res.send("magic will run here...")
  }
  // verify your identity to reset your password
  static async verify(req, res){
    res.send("magic will run here...");
  }
  // set new password
  static async newPassword(req, res){
    res.send("magic will run here...");
  }
  // Update Profile
  static async updateProfile(req, res){
    res.send("magic will run here...");
  }
}
// validate:create user
function validateUser(user) {
  const schema = {
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    username: Joi.string().min(2).max(30).required(),
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
