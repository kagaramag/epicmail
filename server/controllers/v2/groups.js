/* eslint linebreak-style: ["error", "windows"] */
// Joi, validation helper
import Joi from "joi";
import pool from "../../config/db";

import ST from "../../config/status";
import moment from "moment";

class Group {
  static async createGroup(req, res) {
    // validate inputs
    const { error } = validateGroup(req.body);
    if(error) return res.status(ST.BAD_REQUEST).send({ status: ST.BAD_REQUEST, error: error.details[0].message });

    const group = {
      name: req.body.name,
      userid: req.userId
    };
    const query = "INSERT INTO groups(name, userid) VALUES($1, $2) RETURNING *";
    const inputs = [group.name, group.userid];
    pool
      .query(query, inputs)
      .then(response => {
        pool
        .query("INSERT INTO groupmembers(userid, groupid, userrole, createdon) VALUES($1, $2, $3, $4) RETURNING *", [req.userId, response.rows[0].id, true, moment().format("YYYY-MM-DD HH:mm:ss")])
        .then(response => {
          if(response.rowCount === 0) return res.status(ST.CREATED).send({ status:ST.CREATED, message: "Group has been created" });
          return res.status(ST.CREATED).send({ status:ST.CREATED, data: response.rows })
        })
        .catch(e => {
          if(e.routine === 'parserOpenTable') return res.status(ST.BAD_REQUEST).send({status: "No database table found!" });
          return res.status(ST.BAD_REQUEST).send({ status: ST.BAD_REQUEST, error: "Error occured, try again" });
        });
      })
      .catch((e) => {
        if (e.routine === "_bt_check_unique")
          return res
            .status(ST.EXIST)
            .send({ status: ST.EXIST, error: "Group already exist" });
        if (e.routine === "scanner_yyerror")
          return res
            .status(ST.BAD_REQUEST)
            .send({
              status: ST.BAD_REQUEST,
              error: "Error occured, check your SQL Query"
            });
        if (e)
          return res
            .status(ST.BAD_REQUEST)
            .send({
              status: ST.BAD_REQUEST,
              error: "Whoops, unexpected error occured. Try again"
            });
      });
    req.setTimeout(30000);
  }

  // get all groups
  static async getAllGroup(req, res) {
    const query = "SELECT * FROM groups where userid = $1";
    pool
      .query(query, [req.userId])
      .then(response => {
        if(response.rowCount === 0){ 
          res.status(ST.OK).send({
            status: ST.OK,
            error: "You are not in a group yet!" 
          });  
          return;        
        }else{
          res.status(ST.OK).send({
            status: ST.OK,
            data: response.rows
          });
          return
        }
      })
      .catch(e => {
        if(e.routine === 'parserOpenTable') return res.status(ST.NO_CONTENT).send({status: "No database table found!" });
        if (e.routine === "scanner_yyerror")
          return res
            .status(ST.BAD_REQUEST)
            .send({
              status: ST.BAD_REQUEST,
              error: "Error in your query occured"
            });
        if (e)
          return res
            .status(ST.BAD_REQUEST)
            .send({ status: ST.BAD_REQUEST, error: "Something went wrong!" });
      });
  }
  // assign user to group
  static async assignUserGroup(req, res){
    // validate group   
    const { error } = validateUserAssignGroup(req.body);
    if (error)
      return res
        .status(ST.BAD_REQUEST)
        .send({ status: ST.BAD_REQUEST, error: error.details[0].message });

      const groupid = req.params.id;
      // check if admin
      pool
      .query(`SELECT * from groups WHERE userid = $1 AND id = $2`, [req.userId, groupid])
      .then(response => {
        if(response.rowCount === 0) return res.status(ST.UNAUTHORIZED).send({status: ST.UNAUTHORIZED, error: 'Sorry, You dont have permission'}); 
        
        // group member existance
        pool
        .query('SELECT * from groupmembers WHERE groupid = $1 AND userid = $2', [groupid, req.body.userid])
        .then(response => {
          if(response.rowCount === 1) return res.status(ST.UNAUTHORIZED).send({status: ST.UNAUTHORIZED, error: 'User already exist'});
            // assign user
            const userInfo = "INSERT INTO groupmembers(groupid, userid, userrole, createdon) VALUES($1, $2, $3, $4) RETURNING *";
            pool
            .query(userInfo, [groupid, req.body.userid, false, moment().format("YYYY-MM-DD HH:mm:ss")])
            .then(response => {
              return res.status(ST.CREATED).send({ status: ST.CREATED, message: "User assigned successfully" });
            })
            .catch(e => {
              console.log(e);
              if(e.routine === 'ri_ReportViolation') return res.status(ST.NOT_FOUND).send({status: ST.NOT_FOUND, error: 'User not found'});
                res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: 'Something went wrong while assigning the user to the group, contact the adminstrator '});
            });

        })
      })
      .catch(e => console.log(e))
      return;

  }
  // assign user to group
  static async editGroup(req, res){
    // validate group   
    const { error } = validateEditGroup(req.body);
    if (error)
      return res
        .status(ST.BAD_REQUEST)
        .send({ status: ST.BAD_REQUEST, error: error.details[0].message });
    
    // update group name
    pool
    .query("UPDATE groups SET name = $1 WHERE id = $2 RETURNING *", [req.body.name, req.params.id])
    .then(response => {
      res.status(ST.OK).send({ status: ST.OK, data: response.rows[0]  })
    })
    .catch(e => res.status(ST.BAD_REQUEST).send({ status: ST.BAD_REQUEST, error: "Error occured, try again" }))

  }
  // // delete group
  static async deleteGroup(req, res){
   await pool
    .query('DELETE FROM groups WHERE id = $1 AND userid = $2', [req.params.id, req.userId])
    .then((response)=> {
      if(response.rowCount === 0) return res.status(ST.UNAUTHORIZED).send({status: ST.UNAUTHORIZED, error: 'Sorry, group doest not exist'}); 
      res.status(ST.OK).send({ status: ST.OK, message: "Group has been deleted successfully" })
    })
    .catch(e => {
      res.status(ST.BAD_REQUEST).send({ status: ST.BAD_REQUEST, error: "Group has been deleted successfully" })
    })
  }
  // // delete user from group
  static async deleteUserFromGroup(req, res){
    const query = "SELECT * FROM groups WHERE id = $1 AND userid = $2";
    await pool
      .query(query, [parseInt(req.params.groupid), req.userId])
      .then(response => {
          if(response.rowCount === 0) return res.status(ST.NOT_FOUND).send({status: ST.NOT_FOUND, error: 'Group cannot be found'}); 
          const query = `DELETE FROM groupmembers WHERE groupid = $1 AND userid = $2 AND userrole = 'false'`
          pool
          .query(query, [req.params.groupid, req.params.memberid])
          .then(response => {
            if(response.rowCount === 0) return res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: 'A user you are trying to delete does not exist in the group'}); 
            return res.status(ST.OK).send({ status: ST.OK, message: "User has been deleted successfully" })
          })
          .catch(e => res.status(ST.BAD_REQUEST).send({ status: ST.BAD_REQUEST, message: "You can not delete this user right now, try again later" }))
        })
      .catch(e => res.status(ST.BAD_REQUEST).send({ status: ST.BAD_REQUEST, message: "Error occured while checking group information, try again later" }))
    return;

  }
}
// validate groups
function validateGroup(group) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(30)
      .required()
  };
  return Joi.validate(group, schema);
}
// validate validateUserAssignGroup
function validateEditGroup(group) {
  const schema = {
    name: Joi.string().min(2).max(60).required()
  };
  return Joi.validate(group, schema);
}
// validate validateUserAssignGroup
function validateUserAssignGroup(user) {
  const schema = {
    userid: Joi.number().integer().required()
  };
  return Joi.validate(user, schema);
}
export default Group;
