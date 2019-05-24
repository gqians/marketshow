import Koa from 'koa';
import "babel-polyfill";
import config from './config';//加载配置文件
import middleware from './middleware/index';

import updata from './model/updata';
updata();
const app=new Koa();
app.use(async (ctx,next)=>{
    console.log(1);
    await next();
})
middleware(app);
app.listen(config.port,()=>{
    console.log("监听端口"+config.port+"成功");
});
