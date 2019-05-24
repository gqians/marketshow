//import { Pool, Client } from 'pg'
let { Pool, Client }=require('pg');
let expect = require('chai').expect;
const assert = require('assert');
//进行连接池配置
let pool = new Pool({
  user: 'postgres',
  host: '192.168.142.20',
  database: 'postgres',
  password: '1973078177',
  port: 5432,
  poolSize: 5,
  poolIdleTimeout: 30000,
  reapIntervalMillis: 10000

});
export default (async () => {
  const client = await pool.connect();
  console.log('连接成功');
  return client;
})




//module.exports = add;