// user controller
import users from "../data/users";
import groups from "../data/groups";

// encryption
import bcrypt from "bcrypt";

// Validator
import Validate from "../helpers/validation";

// generate date with js
import moment from "moment";

import Role from '../helpers/role'


import fs from 'fs';

class Group {
  static async createGroup(req, res) {
    // create user info object
    
    // Verify if you are admin
    let check = Role.admin(req.token);
    if(!check) return res.send({
      status:400,
      error: "Error"
    })

    const group = {
      id: groups.length + 1,
      name: req.body.name,
      createdOn: moment().format("MM-DD-YYYY hh:mm:ss")
    };   

    
    // capturing the inputs to valitads
    let checkInputs = [];
    checkInputs.push(Validate.name(group.name, true));

    for (let i = 0; i < checkInputs.length; i += 1) {
      if (checkInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkInputs[i].error,
        });
      }
    }

    // check if user not exist in database
    
    let new_group = groups.find(item => item.name === group.name);
    if (new_group)
      return res
        .status(400)
        .send({
          status: 400,
          error: "Group already exists, try another one"
      });

    // save new user in the db
    try{
      groups.push(group);    
      var file = fs.createWriteStream('server/data/groups.js');
      file.write('const groups = \n');
      file.write(JSON.stringify(groups));
      file.write('\n export default groups;');
      file.end();
      // return group created
      return res.status(200).send({
         status: 200,
         data: [{
            group:group
         }]
      });
    }catch(err){
      return res.status(400).send({
         status: 400,
         error: "Error occured, try again."
      });
    }   
   }

   // get all groups
   static async getAllGroup(req, res){
      console.log("under construction")
   }
}

export default Group;