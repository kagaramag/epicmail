// user controller
import users from "../data/users";

// encryption
import bcrypt from "bcrypt";

// Validator
import Validate from "../helpers/validation";

// generate date with js
import moment from "moment";

// register envirnoment variables
import dotenv from "dotenv";
dotenv.config();

// Web token
import jwt from "jsonwebtoken";


import fs from 'fs';
// import stream from 'stream';

class Auth {
  static async signup(req, res) {
    // create user info object
    const user = {
      id: users.length + 1,
      email: req.body.username+"@epicmail.com",
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      type: "user",
      password: req.body.password,
      createdOn: moment().format("MM-DD-YYYY hh:mm:ss"),
      username: req.body.username
    };
    // capturing the inputs to valitads
    let checkInputs = [];
    checkInputs.push(Validate.username(user.username, true));
    checkInputs.push(Validate.name(user.firstName, true));
    checkInputs.push(Validate.name(user.lastName, true));
    checkInputs.push(Validate.name(user.password, true));

    for (let i = 0; i < checkInputs.length; i += 1) {
      if (checkInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkInputs[i].error,
        });
      }
    }

    // check if user not exist in database
    let new_user = users.find(item => item.username === user.username);
    if (new_user)
      return res
        .status(400)
        .send({
          status: 400,
          error: "Username has been already taken, try another one"
        });

    // generate random data
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));

    // create a random data to the password before encrypting
    user.password = await bcrypt.hash(user.password, salt);

    // save new user in the db
    users.push(user);
    
   var file = fs.createWriteStream('server/data/users.js');
   file.write('const users = \n');
   file.write(JSON.stringify(users));
   file.write('\n export default users;');
   file.end();

    // logging in a new user
    const verify = bcrypt.compare(user.password, user.password);
      if(verify) {
         const token = jwt.sign({ user: user.id, type: user.type }, process.env.SECRET);
         return res.status(200).send({
            status: 200,
            data: [{
               token: token
            }]
         });
      }else{
         return res.status(400).send({
         status: 400,
         error: "We could not authethicate you, try login form."
         });
      }
   }

   static async login(req, res) {
      const user = users.find(item => item.username === req.body.username);
      if (!user){
         return res.status(400).send({
         status: 400,
         error: "Invalid username"
         });
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword)
         return res.status(400).send({
         status: 400,
         error: "Invalid username or password"
         });

      res.send({
         status: 200,
         error: "user successfully signed in"
      });
   }
}

export default Auth;