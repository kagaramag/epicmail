import { Router } from 'express';


// import routes
import welcome from './welcome';
import swagger from './swagger';
import users from './users';
import contacts from './contact';
import groups from './groups';
import messages from './messages';
import errors from './errors';

const routers = Router();

routers.use(welcome);
routers.use(swagger);
routers.use(users);
routers.use(contacts);
routers.use(groups);
routers.use(messages);
routers.use(errors);

export default routers;