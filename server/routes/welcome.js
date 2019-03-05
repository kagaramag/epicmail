import express, { Router } from 'express';

const app = express();

import Welcome from '../controllers/welcome';

const welcomeRouter = Router();

welcomeRouter.get('/', Welcome.getWelcome);

export default welcomeRouter;