const userService = require("../service/user.service");

// 头像接口的逻辑
class AvatarController{

  //1. 根据Id将头像存入数据库
  async setAvatar(ctx ,next) {
    try {

      // 1. 获取用户传递过来的id
      const userId = ctx.params.userId;
        
      const { avatarImage } = ctx.request.body;
      
      // 2. 存入头像
      const userData = await userService.setAvatar(userId,{
          avatarImage,
      })      

      // 4. 查看存储的结果，告知前端创建成功
      ctx.body = {
          code:0,
          message:'头像设置成功~',
          image:avatarImage,
        }
      } catch (error) {
        
        console.log(error)  

        next(error)  
    }
  }
  
  // 2. 根据username从数据库读取头像
  async findAvatar(ctx ,next) {
    try {

      // 1. 获取用户传递过来的用户名
      const username = ctx.params.username;

      // 2. 根据用户名查询对应头像
      const  data = await userService.findAvatar(username) 

      // 3. 返回的是数组类型，使用需要取出第一个元素
      const  avatarImage  = data[0].avatarImage

      // 4. 查看存储的结果，告知前端创建成功
      ctx.body = {
          code:0,
          message:'头像获取成功~',
          avatarImage:avatarImage,
        }
      } catch (error) {

        console.log(error)  

        next(error)  
    }
  }
}

module.exports = new AvatarController() 