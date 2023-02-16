const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/screct')

class LoginController {
  async login(ctx,next) {
    try {
      //  1. 获取用户信息
      const { id,username } = ctx.user
      
      //  2. 颁发令牌，传入私钥
        const token = jwt.sign({id,username},PRIVATE_KEY,{
          expiresIn: 60 * 60 * 24,
          algorithm:'RS256'
        })
      //  3.返回用户信息
      ctx.body = { 
       code : 0 , 
       message:"登录成功~",
       data:{ id , username , token}
     }
    } catch (error) {
     ctx.app.emit('error',UNAUTHORIZATION,ctx)
   }}
  async test(ctx,next){
    ctx.body = '测试请求成功'
  }
 }

module.exports = new LoginController()