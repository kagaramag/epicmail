/* eslint linebreak-style: ["error", "windows"] */
import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// Parse incoming request bodies in a middleware 
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

import path from 'path';

import  exphbs from 'express-handlebars';
var hbs = exphbs.create({
  helpers: {
      foo: function () { return 'FOO!'; }
  }
});
app.set("views",path.join(__dirname,"views"))

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: [
    'views/includes/'
  ]
}));

app.set('view engine', 'handlebars');

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);



// import routes
import routers from './routes/index';
app.use(routers);



app.listen(PORT, () => {
  console.log(`Server started with Port: ${PORT}`);
});

export default app;