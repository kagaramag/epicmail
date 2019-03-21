
// validator
import Joi from "joi";
import jwt from "jsonwebtoken";
// encryption
import bcrypt from "bcrypt";
// Status code
import ST from "../../config/status";
import pool from "../../config/db";
import moment from "moment";

class Message {
  // list of received emails
  static async receivedEmails(req, res) {
    pool
    .query(`
    SELECT 
    messages.id, messages.subject, messages.message, 
    messages.status, messages.senderid, messages.receiverid, 
    messages.groupid, messages.parentmessageid, messages.createdon, 
    users.email 
    FROM messages 
    LEFT JOIN users on users.id = messages.receiverid 
    AND 
    messages.receiverid = $1
    `, [req.userId])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'No messages received yet'});

      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: e }));
  }

  // list of unread messages
  static async unreadEmails(req, res) {
    pool
    .query(`SELECT * from messages where id = $1 and state = 'unread'`, [req.userId])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'No unread messages'});

      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: "Something went wrong, try again" }));
  }


  // list of sent emails
  static async sentEmails(req, res) {
    pool
    .query(`SELECT * from messages WHERE senderid = $1 AND status != 'draft'`, [req.userId])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'No messages sent yet'});

      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: e }));
  }

  // Delete an email
  static async specificEmail(req, res) {
    // find email message
    pool
    .query(`
    SELECT * from messages 
    WHERE id = $1    
    `, [req.params.id])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'The message is not found'});
      
      if(!response.rows[0].groupid && req.userId == response.rows[0].receiverid){
        pool
        .query(`UPDATE messages SET status = 'read' WHERE id = $1`, [req.params.id])
        .then()
      }
      return res.status(ST.OK).send({status: ST.OK, data: response.rows });


    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: "Error occured, try again later" }));
  }

  // compose message
  static async compose(req, res, next) {
    // validate message   
    const { error } = validateMessage(req.body);
    if (error)
      return res
        .status(ST.BAD_REQUEST)
        .send({ status: ST.BAD_REQUEST, error: error.details[0].message });

    // check parent message
     const message = {
        subject: req.body.subject,
        message: req.body.message,
        receiverid: req.body.receiverid,
        createdon: moment().format("YYYY-MM-DD HH:mm:ss")
      }
      // save email first
      const query ="INSERT INTO messages(subject, message, status, senderid, receiverid, createdon) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
      const values = [message.subject, message.message, 'sent', req.userId, message.receiverid, message.createdon];
      
      pool
      .query(query, values)
      .then(response => {  
        if(response.rowCount === 1 ) return res.status(ST.CREATED).send({status: ST.CREATED, data: response.rows });
      })
      .catch(e => { 
        return res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: "Error occured, try again" })
      });
  }
  // send to group
  static async sendEmailGroup(req, res, next) {
    // validate message   
    const { error } = validateMessageForGroup(req.body);
    if (error)
      return res
        .status(ST.BAD_REQUEST)
        .send({ status: ST.BAD_REQUEST, error: error.details[0].message });

    // check parent message
     const message = {
        subject: req.body.subject,
        message: req.body.message,
        groupid: req.body.groupid,
        createdon: moment().format("YYYY-MM-DD HH:mm:ss")
      }
      // save email first
      const query ="INSERT INTO messages(subject, message, status, senderid, groupid, createdon) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
      const values = [message.subject, message.message, 'sent', req.userId, message.groupid, message.createdon];
      
      pool
      .query(query, values)
      .then(response => {  
        if(response.rowCount === 1 ) return res.status(ST.CREATED).send({status: ST.CREATED, data: response.rows });
      })
      .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: "Error occured, try again" }));
  }
  // Draft message
  static async draft(req, res, next) {
    // validate email   
    const { error } = validateDraft(req.body);
    if (error)
      return res
        .status(ST.BAD_REQUEST)
        .send({ status: ST.BAD_REQUEST, error: error.details[0].message });

    // check parent message
     const message = {
        subject: req.body.subject,
        message: req.body.message,
        senderid: req.userId
      }
      // save email first
      const query ="INSERT INTO messages(subject, message, senderid, status) VALUES($1, $2, $3, $4) RETURNING *";
      const values = [message.subject, message.message, message.senderid, 'draft'];
      
      pool
      .query(query, values)
      .then(response => {  
        if(response.rowCount === 1 ) return res.status(ST.CREATED).send({status: ST.CREATED, data: [ response.rows ] });
        
      })
      .catch(e => {
        res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: "Sorry you can not a message, try again" })
      });
  }
  // read
  static async readEmails(req, res){
    pool
    .query(`
    SELECT 
    *
    FROM messages
    where status = 'read' 
    AND
    receiverid = $1
    `, [req.userId])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'No messages received yet'});

      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: "Error occured while retrieving the messages" }));
  }
}
// validate:message
function validateMessage(email) {
  const schema = {
    subject: Joi.string().min(2).max(60).required(),
    message: Joi.string().min(3).max(1600).required(),
    receiverid: Joi.number().integer().required(),
    groupid: Joi.number().integer()
  };
  return Joi.validate(email, schema);
}
// validate:message for group
function validateMessageForGroup(email) {
  const schema = {
    subject: Joi.string().min(2).max(60).required(),
    message: Joi.string().min(3).max(1600).required(),
    groupid: Joi.number().integer().required()
  };
  return Joi.validate(email, schema);
}
// validate:draft
function validateDraft(email) {
  const schema = {
    subject: Joi.string().min(2).max(60).required(),
    message: Joi.string().min(3).max(1600).required()
  };
  return Joi.validate(email, schema);
}

export default Message;
