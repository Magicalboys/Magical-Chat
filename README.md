# Magical-Chat


用到的技术栈：

`React` + `Koa` + MySQL + JWT + Socket.io 的即时通讯聊天室。


用到的库：

emoji-pick-react + react-toastify + uuid + @koa/cors + axios + react-icons + styled-components


目前实现的功能：

* 根据 QQ号 或 随机数 生成头像

* 基于 rem + 媒体查询的 移动端适配（虽然有点鸡肋）

* 为了提高用户体验，利用 scrollIntoView API 搭配 useRef，实现了聊天窗口滚动显示最新的消息的功能

* 利用 socket.io 生成 WebSoet 服务器，实现了文字消息和 emoji 表情的实时发送，分别实现了群聊和私聊两种通信方式

待开发：

* 消息提醒与消息已读

* 展示用户 GitHub 或 blog 链接

* 根据消息，实时更新用户列表顺序

* ...


开发时需要注意的坑点：

* MySQL 如果要支持emoji，字符集需要默认是`utf8mb4`，因为`utf8`只能存储 3 字节 ，而一般的 emoji 表情是 4 字节

部署时需要注意的坑点：

* 启动端口后如果没响应先看看是否放行了改端口。

* PM2 在使用时需要注意 Nodejs 的版本是否和本地 Nodejs 一致。

* React 在部署时 `package.json` 记得加上 `"homepage":".",` 字段。

* 如果后端升级成了 HTTPS，一定要注意前端在 socket 连接时用 `wss` 而不是 `ws`.

* 因为数据库字符集是`utf8mb4`，使用建议使用本地的数据库连接远程服务器，然后导入项目，会方便很多。

* 入口文件中端口号如果是 配置文件 `env` 中定义的常量的话，启动目录一定要和 `env` 是同级，不然访问不到pm2访问不到。

* 如果前端升级成了 `HTTPS`，后端接口也需要部署 `SSL` 证书 升级成 `HTTPS` 才能访问资源，方法是在 PM2管理器 中映射一个新的子域名即可。





