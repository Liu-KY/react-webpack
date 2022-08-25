const ESLinkPlugin = require("eslint-webpack-plugin");

module.exports = {
  //模式
  mode: "development",
  devtool: "inline-source-map",
  optimization: {
    minimize: false,
  },

  //服务器 端口8080；自动打开
  devServer: {
    port: 9000,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    proxy:{
      '/api':{
        target:"http://localhost:9999",
        changeOrigin:true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        exclude:/\.module\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.module\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "sass-loader",
        ],
      },



    ],
  },
  plugins: [
    new ESLinkPlugin({
      eslintPath: "eslint",
      extensions: ["js", "jsx", "ts", "tex"],
      exclude: ["node_modules"],
      fix: false,
      formatter: "stylish",
    }),
  ],
};
