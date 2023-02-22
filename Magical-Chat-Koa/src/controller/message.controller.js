const messageServe = require("../service/message.serve");

class MessageController{
  async addMessage(ctx ,next) {
    try {
          // 1. 获取用户传递过来的信息
      const { from , to , msg} = ctx.request.body;


      // 3. 将 user 信息存储到数据库中   
      const result = await messageServe.addMessage(from,to,msg)

      // 4. 查看存储的结果，告知前端创建成功
      ctx.body = {
          code:0,
          message:`注册成功~`,
          data:{ from , to , msg }
        }
      } catch (error) {
        console.log(error)
    } 
  }

  async getMessage(ctx ,next) {
    try {
        // 1. 获取用户传递过来的信息
        const { from , to } = ctx.request.body;

        // 3. 将 user 信息存储到数据库中   
        const messages = await messageServe.getMessage(from,to)

        // 4. 查看存储的结果，告知前端创建成功
        ctx.body = {
            code:0,
            message:`注册成功~`,
            data:messages
        }
      } catch (error) {
        console.log(error)
     }
  }

  async getAllMessage(ctx ,next) {
    try {
        // 1. 获取用户传递过来的信息
        const { from , to } = ctx.request.body;

        // 3. 将 user 信息存储到数据库中   
        const messages = await messageServe.getAllMessage(from,to)

        // 4. 查看存储的结果，告知前端创建成功
        ctx.body = {
            code:0,
            message:`群聊消息获取成功~`,
            data:messages
        }
      } catch (error) {
        console.log(error)
     }
  }
}

module.exports = new  MessageController()