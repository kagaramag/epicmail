import { Router } from 'express';

const errorRouter = Router();

// error handler
errorRouter.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    message: "Error 404. Page not found"
  });
});

// Handle unrecognized endpoints
errorRouter.use((err, req, res) => {
  res.status(500).send({
    status: 500,
    message: "Error 505. Internal server error"
  });
});

export default errorRouter;