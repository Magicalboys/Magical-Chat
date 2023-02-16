// 统一处理错误
const app = require('../app');
const { 
  NAME_OR_PASSWORD_IS_REQUIRED, 
  NAME_OR_PASSWORD_IS_EXIST,
  NAME_IS_NOT_EXISTS, 
  PASSWORD_IS_INCORRENT, 
  UNAUTHORIZATION 
} = require('../config/error');

app.on('error',(error,ctx) =>{
  
  let code = 0 , message = '';

  switch(error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或者密码不能为空哦~'
      break;
    case NAME_OR_PASSWORD_IS_EXIST:
      code = -1002
      message = '用户名有人用过啦，换一个试试~'
      break;
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = '用户名记错了吧？再好好想想~'
      break;
    case PASSWORD_IS_INCORRENT:
      code = -1004
      message = '记错密码了吧？再好好想想~'
      break;
    case UNAUTHORIZATION:
      code = -1005
      message = 'token 错误或失效,请重新登录'
    }

  ctx.body = { code , message }
})