// 数据库连接
const mysql = require('mysql2')

// 1. 创建连接池
const connectionPool = mysql.createPool({
  host: '',
  port: 3306,
  database: 'coderhub',
  user: 'root',
  password: 'password',
  connectionLimit: 5
})

// 2. 获取连接是否成功
connectionPool.getConnection((err, connection) => {
  // 1. 判断是否有错误信息
  if (err) {
    console.log(`获取连接失败`, err);
    return;
  }
  // 2. 获取 connection，尝试与数据库建立连接
  connection.connect(err => {
    if (err) {
      console.log(`数据库交互失败`, err);
    } else {
      console.log(`数据库成功连接,可以操作数据库~`)
    }
  })
})

// 3. 获取连接池连接对象(promise)
const connection = connectionPool.promise();

module.exports = connection;