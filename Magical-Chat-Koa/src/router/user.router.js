const KoaRouter = require('@koa/router')
const UserController = require('../controller/user.controller')
const { verifyUser, handlePassword, verifyUserName } = require('../middleware/user.middleware');
// 1.创建路由对象
const  userRouter = new KoaRouter({prefix:'/users'})

// 2.定义路由中的映射

//   用户注册接口
userRouter.post('/',verifyUser,handlePassword,UserController.create)

//   用户名重置接口
userRouter.post('/name/:userId',verifyUserName,UserController.setName)

//   获取除用户列表
userRouter.get('/:id',UserController.getAllUser)


// 3.导出路由
module.exports = userRouter;