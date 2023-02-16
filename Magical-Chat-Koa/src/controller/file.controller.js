const fileService = require("../service/file.service");

class FileController{
  async create(ctx,next){

    // 上传的文件信息会自动传到ctx.request.file
    const { filename ,mimetype ,size } = ctx.request.file;

    // 获取上传文件的 id
    const { id } = ctx.user;

    console.log(id)
    
    // 将图片的信息和 id 结合起来进行存储
    const result = await fileService.create(filename,mimetype,size,id)
    
    // 返回结果
    ctx.body = {
      code:0,
      message:'头像上传成功，可以查看',
      data:result
    }
  }
}


module.exports = new FileController()