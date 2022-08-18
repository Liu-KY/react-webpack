// 从node进程中引入自带模块path
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProgressPlugin ,ProvidePlugin} = require("webpack");

module.exports = {
  //入口
  entry: {
    //抽离出第三方包的代码
    vendors:['react','react-dom/client'],
    //名字：当前路径，+ "../", "src/main.js"
    app: {
      import:path.resolve(__dirname,'../','src/main.js'),
      //用dependOn指定业务代码所依赖的第三方包
      dependOn:'vendors'
    },
  },
  //出口
  output: {
    // 当前路径，+ "../", "dist"
    path: path.resolve(__dirname, "../", "dist"),
    // js的默认导出文件 js文件夹下面  名字+八位哈希值+.js
    filename: "js/[name].[chunkhash:8].js",
    clean: true,
  },

  // 插件
  //   webpack所有的插件都是需要new的
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../", "public/index.html"),
      title: "月",
      inject: "body",
      filename: "index.html",
    }),
    new ProgressPlugin({}),
    new ProvidePlugin({
      React: path.resolve(__dirname, '../', 'node_modules/react/index.js')
    })
  ],

  module:{
    rules:[
        //  js打包
        {test: /\.(js|jsx|ts|tsx)$/,use:'babel-loader',exclude:/node_modules/,include:/src/},
        //图片打包
        { test:/\.(png|svg|jpg|gif|jpeg|webp)$/,type:'asset/resource',generator:{filename:'img/[name].[contenthash:8][ext]'}}
    ]
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'../','src'),
    },
    extensions:['.js','.jsx','.ts','.tsx'],
    modules:[path.resolve(__dirname,'../','node_modules')],
  },
  target:'web'
};
