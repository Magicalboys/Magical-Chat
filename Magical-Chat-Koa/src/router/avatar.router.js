const KoaRouter = require('@koa/router');
const avatarController = require('../controller/avatar.controller');

// 1.创建路由对象
const  userRouter = new KoaRouter({prefix:'/avatar'})

// 2.定义路由中的映射

// 2.2 为用户提供头像
userRouter.post('/:userId',avatarController.setAvatar)
userRouter.get('/findavatar/:username',avatarController.findAvatar)

// 3.导出路由
module.exports = userRouter;