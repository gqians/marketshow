const path = require('path');
const ip = require('ip');
import staticFiles from 'koa-static';
import miSend from './mi-send/index';
import miLog from './mi-log/index';
export default (app) => {
    app.use(miLog({
        env: app.env,
        projectName: 'koa2-tutorial',
        appLogLevel: 'debug',
        dir: 'logs',
        serverIp: ip.address()
    }));
    app.use(staticFiles(path.resolve(__dirname, "../public")));
    app.use(miSend());
}
