/* eslint linebreak-style: ["error", "windows"] */
// validator
import Joi from "joi";
// Status code
import ST from "../../config/status";
import pool from "../../config/db";

class Users {
  static me(req, res) {
    pool
    .query(`SELECT  id, firstname, lastname, email, phone, profile, createdon, isadmin  from users where id = $1`, [req.userId])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUND).send({status: ST.NOT_FOUND, error: 'This account is not longer active '});
      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: "Sorry, Error occured try again" }));
  }
  static updateProfile(req, res) {
    // validate inputs    
    const { error } = validateUser(req.body);
    if (error)
      return res
        .status(ST.BAD_REQUEST)
        .send({ status: ST.BAD_REQUEST, error: error.details[0].message });
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: parseInt(req.body.phone),
      profile: req.body.profile_photo,
    };
    pool
    .query(`UPDATE users SET firstname=$1, lastname=$2, phone=$3, profile=$4 WHERE id = $5 RETURNING id, email, firstname, lastname, phone, profile, createdon`,
    [user.firstname, user.lastname, user.phone, user.profile, req.userId])
    .then(response => {  
      console.log(req.userId);
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUND).send({status: ST.NOT_FOUND, error: 'This account is not longer active '});
      return res.status(ST.OK).send({status: ST.OK, data: response.rows[0] });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: "Sorry, Error occured try again" }));
  }
  static all(req, res) {
    pool
    .query(`SELECT id, firstname, lastname, email, phone, profile, createdon, isadmin from users`)
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUND).send({status: ST.NOT_FOUND, error: 'This account is not longer active '});
      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: "Sorry, Error occured try again" }));
  }
}


// validate:create user
function validateUser(user) {
  const schema = {
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    phone: Joi.string().min(8).max(15),
    profile_photo: Joi.string()
  };
  return Joi.validate(user, schema);
}

export default Users;