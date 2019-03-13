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
    // let check = Role.admin(req.token);
    // if(!check) return res.send({
    //   status:400,
    //   error: "Error, you are not an admin"
    // })

    const group = {
      id: groups.length + 1,
      name: req.body.name,
      createdOn: moment().format("MM-DD-YYYY hh:mm:ss")
    };   
    // console.log(group);
    
    // capturing the inputs to valitads
    let checkInputs = [];
    // checkInputs.push(Validate.name(group.name, true));

        // capturing the inputs to valitads
    // let checkInputs = [];
    checkInputs.push(Validate.string('Group name', group.name, true, 2, 30));
    
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
        .status(409)
        .send({
          status: 409,
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
      return res.status(201).send({
         status: 201,
         data:group
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
    // Verify if you are admin
    // let check = Role.admin(req.token);
    // if(!check) return res.send({
    //   status:400,
    //   error: "Error"
    // })
    // get all groups
    res.status(201).send({
      status:201,
      data:groups
   })
   }
}

export default Group;