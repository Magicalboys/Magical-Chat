const connection = require("../app/database")

// 数据库操作
class FileService {
  // 1. 插入用户名和密码
  async create( filename , mimetype , size ,userId){

    // 拼接 statment
    const statement = 'INSERT INTO `file` (filename,mimetype,size,user_id) VALUES (?,?,?,?);';

    // 执行 SQL 语句
    const [result] = await connection.execute(statement,[filename,mimetype,size,userId]);
    // 异步函数 需要等待语句执行完,再进行下一步操作

    return result; 
  }
}

module.exports = new FileService()