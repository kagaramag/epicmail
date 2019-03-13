import messages from "../data/messages";
import senders from "../data/senders";
import receivers from "../data/receivers";

// encryption
import bcrypt from "bcrypt";

// Validator
import Validate from "../helpers/validation";

// generate date with js
import moment from "moment";

// file writer
import fs from 'fs';

class Message {
  // list of received emails
  static async receivedEmails(req, res){
    if(messages){
       Object.keys(messages).map(function(key){        
        const senderId = {senderId: 1};
        const receiverId = {receiverId: 1};
        return messages[key] = {...messages[key], ...senderId, ...receiverId};
      });
      return await res
      .status(201)
      .send({
        status:201,
        data: messages
      })
    }else{
      return await res
      .status(401)
      .send({
        status:401,
        error: "Sorry, No emails found"
      })
    }   

  }
  // Delete an email
  static async deleteEmail(req, res){
    // find email message
    const id = parseInt(req.params.id); 
    let message = messages.find(item => item.id === id);
    if (!message){
      return res.status(400).send({
        status: 404,
        error: "The email you are trying to delete doesn't exist"
      });
    }else{
      // Remove given email from the object
      const newEmails = messages.filter(function (m) {
        return m.id !== message.id;
      });

      // save new emails object 
      let file = fs.createWriteStream('server/data/messages.js');
      file.write('const messages = \n');
      file.write(JSON.stringify(newEmails));
      file.write('\n export default messages;');
      file.end();

      await res
      .status(201)
      .send({
        status:201,
        message: "Email has been deleted successfully"
      });
    }
  }

  
  // compose email
  static async compose(req, res) {
    // create user info object
    
     const message = {
      id: messages.length + 1,
      subject: req.body.subject,
      message: req.body.message,
      parentMessageId: req.body.parentMessageId,
      status: req.body.status,
      createdOn: moment().format("MM-DD-YYYY hh:mm:ss")
    };   
    
    // something sent
    if(!req.body) return res.status(400).send({
      status:301,
      error: "Nothing to be sent, check your inputs"
    });
    // capturing the inputs to valitads
    let checkInputs = [];
    checkInputs.push(Validate.string('subject', message.subject, true, 5, 50));
    checkInputs.push(Validate.string('message',message.message, true, 5, 2000));
    checkInputs.push(Validate.number('parentMessageId',message.parentMessageId, true));
    checkInputs.push(Validate.string('status',message.status, true, 2, 30));

    for (let i = 0; i < checkInputs.length; i += 1) {
      if (checkInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkInputs[i].error,
        });
      }
    }

   

    // save new user in the db
    try{
      // send an email
      messages.push(message);    
      let file = fs.createWriteStream('server/data/messages.js');
      file.write('const messages = \n');
      file.write(JSON.stringify(messages));
      file.write('\n export default messages;');
      file.end();

      const sender  = {
        id: senders.length+1,
        senderId: req.body.senderId,
        messageId: message.id,
        parentMessageId: message.parentMessageId,
        createdOn: moment().format("MM-DD-YYYY hh:mm:ss")
      }
      
      // record the sender
      senders.push(sender);    
      let fileSender = fs.createWriteStream('server/data/senders.js');
      fileSender.write('const senders = \n');
      fileSender.write(JSON.stringify(senders));
      fileSender.write('\n export default senders;');
      fileSender.end();
      
      const receiver  = {
        id: senders.length+1,
        receiverId: req.body.receiversId,
        messageId: message.id,
        parentMessageId: message.parentMessageId,
        phone: req.body.phone,
        createdOn: moment().format("MM-DD-YYYY hh:mm:ss")
      }
      // record the receiver
      receivers.push(receiver);    
      var fileReceiver = fs.createWriteStream('server/data/receivers.js');
      fileReceiver.write('const receivers = \n');
      fileReceiver.write(JSON.stringify(receivers));
      fileReceiver.write('\n export default receivers;');
      fileReceiver.end();

      const messageToReturn = {
          id: message.id,
          subject: message.subject,
          message: message.message,
          parentMessageId: message.parentMessageId,
          senderId: sender.id,
          receiverId: receiver.id,
          status: message.status,
          createdOn: message.createdOn
      }
      // return group created
      return res.status(201).send({
         status: 201,
         data: [ messageToReturn ]
      });

    }catch(err){
      return res.status(400).send({
         status: 400,
         error: "Error occured, try again."
      });
    }   
   }
}

export default Message
