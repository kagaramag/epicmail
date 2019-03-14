import messages from "../data/messages";
import senders from "../data/senders";
import receivers from "../data/receivers";

// Validator
import Validate from "../helpers/validation";

// generate date with js
import moment from "moment";

// file writer
import fs from "fs";

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
      return await res.status(201).send({
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
    if (!req.body)
      return res.status(204).send({
        status: 204,
        error: "Nothing to be sent, check your inputs"
      });
    // capturing the inputs to valitads
    let checkInputs = [];
    checkInputs.push(Validate.string("subject", message.subject, true, 5, 50));
    checkInputs.push(
      Validate.string("message", message.message, true, 5, 2000)
    );
    checkInputs.push(
      Validate.number("parentMessageId", message.parentMessageId, true)
    );
    checkInputs.push(Validate.string("status", message.status, true, 2, 30));

    for (let i = 0; i < checkInputs.length; i += 1) {
      if (checkInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkInputs[i].error
        });
      }
    }

    // save new user in the db
    try {
      // send an email
      messages.push(message);
      let file = fs.createWriteStream("server/data/messages.js");
      file.write("const messages = \n");
      file.write(JSON.stringify(messages));
      file.write("\n export default messages;");
      file.end();

      const sender = {
        id: senders.length + 1,
        senderId: req.body.senderId,
        messageId: message.id,
        parentMessageId: message.parentMessageId,
        createdOn: moment().format("MM-DD-YYYY hh:mm:ss")
      };

      // record the sender
      senders.push(sender);
      let fileSender = fs.createWriteStream("server/data/senders.js");
      fileSender.write("const senders = \n");
      fileSender.write(JSON.stringify(senders));
      fileSender.write("\n export default senders;");
      fileSender.end();

      const receiver = {
        id: senders.length + 1,
        receiverId: req.body.receiversId,
        messageId: message.id,
        parentMessageId: message.parentMessageId,
        phone: req.body.phone,
        createdOn: moment().format("MM-DD-YYYY hh:mm:ss")
      };
      // record the receiver
      receivers.push(receiver);
      var fileReceiver = fs.createWriteStream("server/data/receivers.js");
      fileReceiver.write("const receivers = \n");
      fileReceiver.write(JSON.stringify(receivers));
      fileReceiver.write("\n export default receivers;");
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
      };
      // return group created
      return res.status(200).send({
        status: 200,
        data: [messageToReturn]
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        error: "Error occured, try again."
      });
    }
  }
}

export default Message;
