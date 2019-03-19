const { Pool, Client } = require('pg')
require('dotenv').config();

// initiate config
let config;
if(process.env.NODE_ENV === 'production'){  
  const url = require('url');
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');
   
  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };
   
}else if(process.env.NODE_ENV === 'test'){
  const url = require('url');
  const params = url.parse(process.env.TEST_DB_URL);
  const auth = params.auth.split(':');
  
  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: process.env.SSL
  };
}else{
  const url = require('url');
  const params = url.parse(process.env.DEV_DB_URL);
  const auth = params.auth.split(':');
  
  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: false
  };
}
// console.log(config);
const pool = new Pool(config);
export default pool;