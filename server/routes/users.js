import { Router } from 'express';

// API version
import version from '../helpers/version';

// user controller
import Users from './../controllers/users';

const usersRouter = Router();

usersRouter.get(`${version}users`, Users.getAllUsers);

export default usersRouter;