const path = require('path');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
	// entry: {
	// 	main: [
	// 		//'@babel/polyfill',
	// 		'./src/index.js',
	// 	]
	// },
  entry:'./src/index.js',
  mode:'development',
  output:{
    filename:'main.js',
    path:path.resolve(__dirname,'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot:true,
    port: 9000
  },
  module: {
    rules:[{
      test:/\.js$/,
      exclude:/node_modules/,
      use:{
        loader:'babel-loader'
      }
    }]
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      //logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
}