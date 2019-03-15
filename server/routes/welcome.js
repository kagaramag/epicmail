/* eslint linebreak-style: ["error", "windows"] */
import express, { Router } from "express";
import Welcome from "../controllers/welcome";

const app = express();


// register route
const welcomeRouter = Router();

// Welcome controller
welcomeRouter.get('/', Welcome.getWelcome);

export default welcomeRouter;