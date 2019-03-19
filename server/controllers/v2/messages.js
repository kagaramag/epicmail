
// validator
import Joi from "joi";
import jwt from "jsonwebtoken";
// encryption
import bcrypt from "bcrypt";
// Status code
import ST from "../../config/status";
import pool from "../../config/db";

class Message {
  // list of received emails
  static async receivedEmails(req, res) {
    pool
    .query(`SELECT * from messages WHERE receiverid = $1`, [jwt.decode(req.token, {complete: true}).payload.user])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'No messages received yet'});

      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: e }));
  }

  // list of unread messages
  static async unreadEmails(req, res) {
    pool
    .query(`SELECT * from messages where id = $1 and state = 'unread'`, [jwt.decode(req.token, {complete: true}).payload.user])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'No unread messages'});

      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => console.log(e));
  }

  // list of read messages
  static async readEmails(req, res) {
    if (messages) {
      let emails = messages.filter(message => {
        if (message.status === "read") {
          return message;
        }
      });
      // console.log(emails);
      return await res.status(200).send({
        status: 200,
        data: emails
      });
    } else {
      return await res.status(404).send({
        status: 404,
        error: "Sorry, No email found"
      });
    }
  }

  // list of sent emails
  static async sentEmails(req, res) {
    pool
    .query(`SELECT * from messages WHERE senderid = $1 AND status != 'draft'`, [jwt.decode(req.token, {complete: true}).payload.user])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'No messages sent yet'});

      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: e }));
  }

  // Delete an email
  static async deleteEmail(req, res) {
    // find email message
    const id = parseInt(req.params.id);
    let message = messages.find(item => item.id === id);
    if (!message) {
      return res.status(400).send({
        status: 400,
        error: "The email you are trying to delete doesn't exist"
      });
    } else {
      // Remove given email from the object
      const newEmails = messages.filter(function(m) {
        return m.id !== message.id;
      });

      // save new emails object
      let file = fs.createWriteStream("server/data/messages.js");
      file.write("const messages = \n");
      file.write(JSON.stringify(newEmails));
      file.write("\n export default messages;");
      file.end();

      await res.status(200).send({
        status: 200,
        message: "Email has been deleted successfully"
      });
    }
  }
  // Delete an email
  static async specificEmail(req, res) {
    // find email message
    pool
    .query(`SELECT * from messages WHERE id = $1`, [req.params.id])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'The message is not found'});

      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: e }));
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
        parentmessageid: req.body.parentmessageid,
        subject: req.body.subject,
        message: req.body.message,
        senderid: jwt.decode(req.token, {complete: true}).payload.user,
        receiverid: req.body.receiverid
      }
      // save email first
      const query ="INSERT INTO messages(subject, message, status, senderid, receiverid, parentmessageid) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
      const values = [message.subject, message.message, 'sent', message.senderid, message.receiverid, message.parentmessageid];
      
      pool
      .query(query, values)
      .then(response => {  
        if(response.rowCount === 1 ) return res.status(ST.CREATED).send({status: ST.CREATED, data: [ response.rows ] });
      })
      .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error:e }));
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
        senderid: jwt.decode(req.token, {complete: true}).payload.user
      }
      // save email first
      const query ="INSERT INTO messages(subject, message, senderid, status) VALUES($1, $2, $3, $4) RETURNING *";
      const values = [message.subject, message.message, message.senderid, 'draft'];
      
      pool
      .query(query, values)
      .then(response => {  
        console.log(response)
        if(response.rowCount === 1 ) return res.status(ST.CREATED).send({status: ST.CREATED, data: [ response.rows ] });
        
      })
      .catch(e => {
        res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error:e })
      });
  }
  // send message to a group
  static async sendEmailGroup(req, res){
    res.send("magic will run here...");
  }
}
// validate:message
function validateMessage(email) {
  const schema = {
    subject: Joi.string().min(2).max(60).required(),
    message: Joi.string().min(3).max(1600).required(),
    parentmessageid: Joi.number().integer().required(),
    receiverid: Joi.number().integer().required(),
    groupid: Joi.number().integer()
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
