const KoaRouter = require('@koa/router');
const messageController = require('../controller/message.controller');
const { verifyUser, handlePassword } = require('../middleware/user.middleware');
// 1.创建路由对象
const  MessageRouter = new KoaRouter({prefix:'/message'})

// 2.定义路由中的映射
// 2.1 用户注册接口
MessageRouter.post('/addMsg',messageController.addMessage)
MessageRouter.post('/getMsg',messageController.getMessage)

// 2.2 为用户提供头像
// MessageRouter.get('/avatar/:MessageId',showAvatarController)

// 3.导出路由
module.exports = MessageRouter;