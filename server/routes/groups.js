import { Router } from 'express';


// API version
import version from '../helpers/version';

// user controller
import Group from './../controllers/groups';
import Auth from './../controllers/auth';

// check authethication
import authethicate from './../middleware/authethicate';

const groupRouter = Router();

groupRouter.post(`${version}groups`,  Group.createGroup);
groupRouter.get(`${version}groups`, Group.getAllGroup);

export default groupRouter;