/* eslint linebreak-style: ["error", "windows"] */
// Joi, validation helper
import Joi from "joi";
import pool from "../../config/db";

import ST from "../../config/status";

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
            .send({ status: ST.EXIST, error: e.detail });
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
        console.log(e);
          return res
            .status(ST.BAD_REQUEST)
            .send({ status: ST.BAD_REQUEST, error: "Something went wrong!" });
      });
  }
  // assign user to group
  static async assignUserGroup(req, res){
    res.send("magic will run here...")
  }
  // assign user to group
  static async editGroup(req, res){
    res.send("magic will run here...")
  }
  // assign user to group
  static async deleteGroup(req, res){
    res.send("magic will run here...")
  }
  // assign user from group
  static async deleteUserFromGroup(req, res){
    res.send("magic will run here...")
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

export default Group;
