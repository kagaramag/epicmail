/* eslint linebreak-style: ["error", "windows"] */
import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// Parse incoming request bodies in a middleware 
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 3000;

// import routes
import routers from './routes/index';
app.use(routers);


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started with Port: ${PORT}`);
});

export default app;