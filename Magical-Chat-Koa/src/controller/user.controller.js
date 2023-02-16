// 每个接口的处理逻辑
const userService = require("../service/user.service");

class UserController{
  async create(ctx ,next) {
    try {
      // 1. 获取用户传递过来的信息
        const user = ctx.request.body;

        console.log( user )

        // 3. 将 user 信息存储到数据库中   
        const result = await userService.create(user)

        // 4. 查看存储的结果，告知前端创建成功
        ctx.body = {
            code:0,
            message:`注册成功~`,
            data:{ user }
      }
    } catch (error) {
      console.log(error)
    }

  }
   async getAllUser(ctx ,next) {
    try {

      // 1. 获取用户传递过来的id
      const userId = ctx.params.id;
      
      // 2. 获取除传入id外的用户的所有信息
      const value = await userService.getAllUser(userId)

      // 3. 返回用户的结果，告知前端创建成功
      ctx.body = {
          code:0,
          message:'用户列表加载成功~',
          allUser:value
        }
      } catch (error) {
        
        console.log(error)   

        next(error) 
    }
  }
}

module.exports = new UserController()