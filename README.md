# Magical-Chat



用到的技术栈：

React + Koa + MySQL + JWT + Socket.io 的即时通讯聊天室。


用到的库：

emoji-pick-react + react-toastify + uuid + @koa/cors + axios + react-icons + styled-components


目前实现的功能：

* 根据 QQ号 或 随机数 生成头像

* 完成了移动端适配（虽然有点鸡肋）

* 利用 socket.io 生成 WebSoet服务器，实现了文字消息和 emoji 表情的实时发送

* 为了提高用户体验，利用 scrollIntoView API搭配 useRef，实现了聊天窗口滚动显示最新的消息的功能

待开发：

* 用户已读

* 消息提醒与消息已读

* 展示用户 GitHub 或 blog 链接

* ...


开发时需要注意的坑点：

* MySQL 如果要支持emoji，字符集需要默认是`utf8mb4`，因为`utf8`只能存储 3 字节 ，而一般的`emoji`表情是 4 字节

* ... 
