const { 
  NAME_OR_PASSWORD_IS_REQUIRED, 
  PASSWORD_IS_INCORRENT ,
  NAME_IS_NOT_EXISTS,
  UNAUTHORIZATION
} = require("../config/error");
const jwt = require('jsonwebtoken');
const { PUBLIC_KEY } = require("../config/screct");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");

// 验证是否已经登录
const verifyLogin =  async (ctx,next) => {
  
  // 1.获取用户名和密码
  const { username , password } = ctx.request.body;
  
  // 2.. 判断用户名和密码是否为空
  if( !username || !password ){
    return ctx.app.emit('error',NAME_OR_PASSWORD_IS_REQUIRED,ctx)
  }

  // 2. 查询该用户是否在数据库中
  const users = await userService.findUserByName(username);
  const user = users[0];

  // 如果数组第一个元素没有值，则说明用户不存在
  if(!user){
    return ctx.app.emit('error',NAME_IS_NOT_EXISTS,ctx)
  }

  
  // 3. 查询数据库中密码和用户传递的密码是否一致
  if(user.password !== md5password(password)){
    return ctx.app.emit('error',PASSWORD_IS_INCORRENT,ctx)
  }
 

  // 4. 将登录的用户信息 保存到 ctx 里面
  ctx.user = user

  // 4. 执行下一个中间件
  await next()
}
// 验证token
const verifyAuth = async(ctx,next) =>{ 

  //  验证token 是否有效
  try{
    // 1. 获取 token
    const authorization = ctx.headers.authorization;
  
    const token  = authorization.replace('Bearer ','')

    // 2. 解密token中的信息
    const result = jwt.verify(token,PUBLIC_KEY,{
      algorithms:['RS256']
    })
    // 3. 将token的信息保留到了 user 属性中
    ctx.user = result;
    
    // 4. 执行下一个中间件
    await next();
  } catch(error){
    console.log(error)
    ctx.app.emit('error',UNAUTHORIZATION,ctx)
  }
}
module.exports = {
  verifyLogin,
  verifyAuth,
}