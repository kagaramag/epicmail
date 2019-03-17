const { Pool, Client } = require('pg')
require('dotenv').config();


let config;
const url = require('url');
const params = url.parse("postgres://gilles:123123@localhost:5432/epicdev");
const auth = params.auth.split(':');
 
config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: false
};
// console.log(config);
const pool = new Pool(config);
export default pool;