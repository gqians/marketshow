import Route from 'koa-router';
import HomeController from './controller/home'
const router =new Route();
export default app=>{
    router.get('/',async (ctx,next)=>{
        ctx.body="hello";
        await next();
        console.log('路由结束')
    });
    router.get('/allcount/:date/:level',HomeController.allcount);
    router.get('/maxCategory/:date/:level',HomeController.maxCategory);
    router.get('/maxSell/:level',HomeController.maxSell);
    router.get('/levelLoc',HomeController.levelLoc);
    app.use(router.routes());
}
//allcount/:date/:address