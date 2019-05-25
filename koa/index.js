import Koa from 'koa';
import "babel-polyfill";
import config from './config';//加载配置文件
import middleware from './middleware/index';
import router from './router'
//import updata from './model/updata';
//updata();//用于将经纬度转化为地址，只执行一次，路由中不存在
const app=new Koa();
router(app);
app.use(async (ctx,next)=>{
    console.log(1);
    await next();
})
middleware(app);
app.listen(config.port,()=>{
    console.log("监听端口"+config.port+"成功");
});
