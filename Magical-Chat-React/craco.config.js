const path = require('path')

const CracoLessPlugin = require("craco-less")

const resolve = pathname => path.resolve(__dirname,pathname)

module.exports = {
  // 配置less 
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#257B5E",
              "@font-size-base": "16px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],

  webpack:{
      // 配置别名
      alias:{
        "@":resolve("src"),
        "components":resolve("src/components"),
        "hooks":resolve("src/hooks"),
        "services":resolve("src/services"),
        "utils":resolve("src/utils"),
        "view":resolve("src/view")
      }
  }
}