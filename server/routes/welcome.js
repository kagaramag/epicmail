import express, { Router } from 'express';

const app = express();

import Welcome from '../controllers/welcome';

// register route
const welcomeRouter = Router();

// Welcome controller
welcomeRouter.get('/', Welcome.getWelcome);

export default welcomeRouter;