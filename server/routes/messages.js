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
messageRouter.delete(`${version}messages/:id`, Message.deleteEmail);

export default messageRouter;