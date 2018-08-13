var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  watch: true,
  entry: path.join(__dirname, 'client', 'index.js'),
  output: {
    filename: 'main.js', 
    path: path.resolve(__dirname, 'dist')
  },
  //externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /(node_modules)/,
        // query: {
        //   presets: ['react', 'env'],
        //  // plugins: ['transform-runtime']
        // }
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [],
  resolve: {
      extensions: ['.json', '.js', '.jsx', '.css']
  },
  devServer: {
    hot: true,
    port: 3000,
    //contentBase: path.join(__dirname, 'dist')
    overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: true, // default false
      errors: true, //default false
    },
  },
};
