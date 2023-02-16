const KoaRouter = require('@koa/router')
const fileController = require('../controller/file.controller')
const { handleAvatar } = require('../middleware/file.middleware')


const { verifyAuth } = require('../middleware/login.middleware')

const fileRouter = new KoaRouter({prefix:'/file'})

try {
// file/avater 上传头像
fileRouter.post('/avater',verifyAuth,handleAvatar,fileController.create)
} catch (error) {
  console.log(error)
}

module.exports = fileRouter
 