const multer = require('@koa/multer')
  
// 定义上传文件的中间件
  const uploadAvatar = multer({
    dest:'./uploads'//上传的位置
  })

// 上传头像

const handleAvatar = uploadAvatar.single('avatar')

module.exports = {
  handleAvatar
}