import { Router } from 'express';


// API version
import version from '../helpers/version';

// user controller
import Users from './../controllers/users';
import Auth from './../controllers/auth';

// check authethication
import authethicate from './../middleware/authethicate';

const usersRouter = Router();

usersRouter.get(`${version}users`, Users.getAllUsers);
usersRouter.post(`${version}/auth/signup`, Auth.signup);
usersRouter.post(`${version}/auth/login`, Auth.login);

export default usersRouter;