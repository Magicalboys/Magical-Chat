const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  SERVER_PORT
} = process.env
// 将 process.env 解构出来，然后再导出