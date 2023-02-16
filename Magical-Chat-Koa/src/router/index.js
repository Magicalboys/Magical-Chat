const fs = require('fs');

function registerRouters(app){

  // 1. 读取当前文件夹下的所有文件
  const files = fs.readdirSync(__dirname)
  
  console.log(files)

  // 2. 遍历所有的文件 动态注册所有的路由对象
  for( const file of files){
    // 如果不是以.router.js 结尾的文件就跳过
    if(!file.endsWith('.router.js'))continue;
    // 如果是以router.js 结尾的文件 就导入
    const router = require(`./${file}`)
    // 统一注册路由对象 
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = registerRouters