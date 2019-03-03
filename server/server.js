/* eslint linebreak-style: ["error", "windows"] */
import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;


// Register Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './../swagger.json';

app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
   res.status(200).send({
      status:200,
      message:"Welcome to EPICMAIL"
   })
});
// error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server started with Port: ${PORT}`);
});

export default app;