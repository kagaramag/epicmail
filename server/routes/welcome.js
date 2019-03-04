import { Router } from 'express';

const welcomeRouter = Router();

welcomeRouter.get('/', (req, res) => {
   res.status(200).send({
      status:200,
      message:"Welcome to EPICMAIL"
   })
});
export default welcomeRouter;