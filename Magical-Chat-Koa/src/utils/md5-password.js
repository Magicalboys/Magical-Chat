// 加密密码，防止数据库明文存储不安全
// crypro 是 node 内置的加密库
const crypro = require('crypto')

function md5password(password){

  const md5 = crypro.createHash('md5');
  // 默认加密成二进制的哈希值  我们一般习惯转化成 16 进制
  password = md5.update(password).digest('hex')

  return password;
}

module.exports = md5password;