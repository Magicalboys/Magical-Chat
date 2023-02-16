const Koa = require('koa')

const cors = require('@koa/cors')

const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const loginRouter = require('../router/login.router')
const registerRouters = require('../router')

// 1. 创建 app
const app = new Koa()

// 2. 对 app 使用 中间件 
app.use( bodyParser() );

app.use( cors())

// 3. 动态注册路由
registerRouters(app)

// app.use( userRouter.routes() );
// app.use( userRouter.allowedMethods() );

// app.use( loginRouter.routes() );
// app.use( loginRouter.allowedMethods() );

// const httpServer = createServer(app.callback())


// 3. 将 app 导出
module.exports = app;