var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(__dirname, 'client', 'index.js'),
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
    proxy: {
      '/': 'http://localhost:4000'
    }
  },
};
