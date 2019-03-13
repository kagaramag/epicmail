import { Router } from 'express';


// API version
import version from '../helpers/version';

// user controller
import Contact from './../controllers/contact';
import Auth from './../controllers/auth';

// check authethication
import authethicate from './../middleware/authethicate';

const contactRouter = Router();

contactRouter.get(`${version}contacts`, Contact.getAllContacts);

export default contactRouter;