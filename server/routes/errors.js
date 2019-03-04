import { Router } from 'express';

const errorRouter = Router();

// error handler
errorRouter.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Handle unrecognized endpoints
errorRouter.use((err, req, res, next) => {
  res.status(500).send({
    status:500,
    message: err.message,
  });
});

export default errorRouter;