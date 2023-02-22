const { NAME_OR_PASSWORD_IS_EXIST, NAME_OR_PASSWORD_IS_REQUIRED } = require('../config/error');

const userService = require('../service/user.service');
const md5password = require('../utils/md5-password');

const verifyUser= async (ctx,next) =>{

  // 2. 验证客户端传递的 user 是否可以保存到数据库中
  const { username , password } = ctx.request.body;
  
  // 2.1 验证用户名和密码是否为空
  if( !username || !password ){
    return ctx.app.emit('error',NAME_OR_PASSWORD_IS_REQUIRED,ctx)
  }

  // 2.2 判断 username 是否在数据库中已经存在
  const exist = await userService.findUserByName(username);
  // 会返回一个数组,如果数组一个数有值就说明存在，不能再注册了
  if(exist[0]){
    return ctx.app.emit('error',NAME_OR_PASSWORD_IS_EXIST,ctx)
  }
  
  // 执行下一个中间件
  await next()
}

const verifyUserName = async (ctx,next) =>{

  // 2. 验证客户端传递的 user 是否可以保存到数据库中
  const { username  } = ctx.request.body;

  if( !username || username === " "  ){
    return ctx.app.emit('error',NAME_OR_PASSWORD_IS_REQUIRED,ctx)
  }

  // 2.2 判断 username 是否在数据库中已经存在
  const exist = await userService.findUserByName(username);

  // 会返回一个数组,如果数组一个数有值就说明存在，不能再注册了
  if(exist[0]){
    return ctx.app.emit('error',NAME_OR_PASSWORD_IS_EXIST,ctx)
  }
  
  // 执行下一个中间件
  await next()
}

// 3. 加密密码后再存储数据库
const handlePassword = async (ctx , next ) =>{
  // 1. 取出密码
  const { password } = ctx.request.body ;
  // 2. 对密码进行加密
  ctx.request.body.password =  md5password(password)
  // 3， 执行下一个中间件
  await next()
}
module.exports = {
  verifyUser,
  handlePassword,
  verifyUserName
}