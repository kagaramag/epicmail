import { Router } from 'express';


// import routes
import welcome from './welcome';
import swagger from './swagger';
import users from './users';
import errors from './errors';

const routers = Router();

routers.use(welcome);
routers.use(swagger);
routers.use(users);
routers.use(errors);

export default routers;