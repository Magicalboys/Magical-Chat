// 1. 导入app
const app = require('./app')

const socket = require('socket.io')

const { SERVER_PORT } = require('./config/server')

// 执行处理错误逻辑的模块
require('./utils/handle-error')

app.use((ctx, next) => {
  ctx.body = `服务器访问成功`
})

const server = app.listen(SERVER_PORT, () => {
  console.log('coderhub 的服务器启动成功')
})

console.log(ORIGINHOST)

const io = socket(server, {
  cors: {
    origin:ORIGINHOST,
    credentials: true,
  },
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  
  global.chatSocket = socket;

  socket.on("add-user", (username) => {
    // socket.name = username;
    
    onlineUsers.set(username, socket.id);

  })

  socket.on("send-msg", (data) => {

    const sendUserSocket = onlineUsers.get(data.to)
  
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data)
    }
  })
  
  socket.on("send-gmsg", (data) => {

    socket.broadcast.emit("msg-group-recieve", data)

  })

})
