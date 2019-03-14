import { Router } from 'express';


// API version
import version from '../helpers/version';

// user controller
import Message from './../controllers/messages';

// check authethication
import authethicate from './../middleware/authethicate';

const messageRouter = Router(); 

messageRouter.post(`${version}messages`, Message.compose);
messageRouter.get(`${version}messages`, Message.receivedEmails);
messageRouter.get(`${version}messages/unread`, Message.unreadEmails);
messageRouter.get(`${version}messages/read`, Message.readEmails);
messageRouter.get(`${version}messages/sent`, Message.sentEmails);
messageRouter.delete(`${version}messages/:id`, Message.deleteEmail);
messageRouter.get(`${version}messages/:id`, Message.specificEmail);

export default messageRouter;