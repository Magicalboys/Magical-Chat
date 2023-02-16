const connection = require("../app/database")

// 数据库操作
class MessageService {
  // 1. 插入消息
  async addMessage( from , to , msg ){

    // 拼接 statment
    const statement = 'INSERT INTO `message` (sender,users,message) VALUES (?,?,?);';

    // 执行 SQL 语句
    const [result] = await connection.execute(statement,[from,to,msg]);
    // 异步函数 需要等待语句执行完,再进行下一步操作

    return result; 
  }
  // 2. 查询消息
  async getMessage( from , to ){
    try {
    // 拼接 statment
    const statement = 'SELECT * FROM `message` WHERE (users) = ? AND (sender) = ? OR (users) = ? AND (sender) = ? order by `timestamps`;';
    
    // 执行 SQL 语句
    const [result] = await connection.execute(statement,[from,to,to,from]);

    // 异步函数 需要等待语句执行完,再进行下一步操作
    console.log(result)
    
    return result; 

    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MessageService()