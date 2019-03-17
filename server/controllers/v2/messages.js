
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
    if (messages) {
      const emails = messages.filter(message => {
        if (message.status === "unread" || message.status === "read") {
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
        error: "Sorry, No emails found"
      });
    }
  }

  // list of unread messages
  static async unreadEmails(req, res) {
    if (messages) {
      let emails = messages.filter(message => {
        if (message.status === "unread") {
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
        error: "Sorry, No emails found"
      });
    }
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
    if (messages) {
      let emails = messages.filter(message => {
        if (message.status === "sent") {
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
  static async draftEmails(req, res) {
    if (messages) {
      let emails = messages.filter(message => {
        if (message.status === "draft") {
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
    const id = parseInt(req.params.id);
    let message = messages.find(item => item.id === id);
    if (!message) {
      return res.status(409).send({
        status: 409,
        error: "The requested email doesn't not exit"
      });
    } else {
      return res.status(201).send({
        status: 201,
        data: [message]
      });
    }
  }

  // compose email
  static async compose(req, res, next) {
    // validate email   
    const { error } = validateEmail(req.body);
    if (error)
      return res
        .status(ST.BAD_REQUEST)
        .send({ status: ST.BAD_REQUEST, error: error.details[0].message });

    // check parent message
    pool
    .query(`SELECT * from messages where id = $1 LIMIT 1`, [req.body.parentmessageid])
    .then(response => {    
      if(req.body.parentmessageid !== 0) if(response.rowCount === 0) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error:'You can not reply to the email which does not exist!'});
      const message = {
        // sender: jwt.decode(req.token).payload,
        parentmessageid:req.body.parentmessageid,
        subject: req.body.subject,
        message: req.body.message
      }
      // save email first
         // check message status
      const text ="INSERT INTO messages(subject, message, status, parentmessageid) VALUES($1, $2, $3, $4) RETURNING *";
      const values = [message.subject, message.message, 'sent', message.parentmessageid];
      
      pool
      .query(text, values, (err, response) => {
          if (err) return console.log(err);

          const messageid = response.rows[0].id;

          // start sending email to the users
          let receiverIdArray = [];
          if(req.body.group !== 0){
            // create array of users from group
            receiverIdArray = [2, 5]
          }else{
            if(req.body.receiverid === 0) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error:'No receiver identified' });     
            receiverIdArray = [ req.body.receiverid ]
          }
          console.log("User id..");
          console.log(jwt.decode(req.token, {complete: true}).payload.user);

          // regiter who send email;
          const send ="INSERT INTO sent(senderid, messageid) VALUES($1, $2) RETURNING *";
          pool
          .query(send, [jwt.decode(req.token, {complete: true}).payload.user, messageid], (err, res) =>{
            console.log(err)
            // if (err) return res.status(ST.BAD_REQUEST).send({ status: ST.BAD_REQUEST, error: err });
          });
          // Record email receiver by their id

          for (let i = 0; i < receiverIdArray.length; i += 1) {            
            const receive ="INSERT INTO inbox(receiverid, messageid) VALUES($1, $2) RETURNING *";
            pool
            .query(receive, [receiverIdArray[i], messageid], (err, res) =>{
              if (err) console.log(err);
            });
          }
        });

    })
    .catch(e => {
      console.log(e);
    })



    ;
  }
  // send message to a group
  static async sendEmailGroup(req, res){
    res.send("magic will run here...");
  }
}
// validate:create user
function validateEmail(email) {
  const schema = {
    subject: Joi.string().min(2).max(60).required(),
    message: Joi.string().min(3).max(1600).required(),
    parentmessageid: Joi.number().integer().required(),
    receiverid: Joi.number().integer().required(),
    group: Joi.number().integer().required()
  };
  return Joi.validate(email, schema);
}

export default Message;
