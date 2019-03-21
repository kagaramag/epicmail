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
    };
    const query = "INSERT INTO groups(name) VALUES($1) RETURNING *";
    const inputs = [group.name];

    pool
      .query(query, inputs)
      .then(response => {
        return res.status(ST.CREATED).send({
          status: ST.CREATED,
          message: "Group created successfully"
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
    const query = "SELECT * FROM groups";
    pool
      .query(query)
      .then(data => {
        if(data.rowCount === 0){ 
          res.status(204).send({
            status: ST.NO_CONTENT,
            error: "No groups created yet!" 
          });
          return;
        }
        res.status(ST.OK).send({
          status: ST.OK,
          data: data.rows
        });
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

    // check if user exist in group
    const text = `SELECT * from groupmembers where userid = $1 AND groupid = $2`;
    const groupid = req.params.id;
    pool
    .query(text, [req.params.id, req.body.userid])
    .then(response => {
      if(response.rowCount === 1) return res.status(ST.EXIST).send({status: ST.EXIST, error: 'User already exist in this group '});     
      // console.log(groupid, req.body.userid, req.body.userrole);
      // Assign him then
      const createdon = moment().format("YYYY-MM-DD HH:mm:ss");
      const userInfo = "INSERT INTO groupmembers(groupid, userid, userrole, createdon) VALUES($1, $2, $3, $4) RETURNING *";
      pool
      .query(userInfo, [groupid, req.body.userid, req.body.userrole, createdon])
      .then(response => {
        // retrieve users from this group
        pool
        .query(`SELECT * from groupmembers WHERE groupid = $1`, [groupid])
        .then(response => {
          // console.log(response)
          return res.status(ST.OK).send({status: ST.OK, data: response.rows});
        })
        .catch(e => {
          console.log(e)
          // res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: 'Something went wrong while retrieving group members. '})
        });
      })
      .catch(e => {
        // if(e.routine === 'ri_ReportViolation') return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'Sorry, group or user does not exist'});     
        
        return res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: 'Something went wrong while assigning the user to the group, contact the adminstrator '});
      
      })

    })
    .catch(e => {
      res.status(ST.BAD_REQUEST).send({ status:ST.BAD_REQUEST, error: "Something went wrong, try again later " })
    });
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
  // // assign user to group
  // static async deleteGroup(req, res){
  //   res.send("magic will run here...")
  // }
  // // assign user from group
  // static async deleteUserFromGroup(req, res){
  //   res.send("magic will run here...")
  // }
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
    userid: Joi.number().integer().required(),
    userrole: Joi.string().min(2).max(60).required()
  };
  return Joi.validate(user, schema);
}
export default Group;
