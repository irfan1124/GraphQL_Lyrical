var path = require('path');
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals');

module.exports = {
  watch: true,
  mode: 'development',
  entry: path.join(__dirname, 'client', 'index.js'),
  output: {
    filename: 'main.js', 
    path: path.resolve(__dirname, 'dist')
  },
  //externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /(node_modules)/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEBUG: JSON.stringify(process.env.DEBUG),
      }
    })
  ],
  resolve: {
      extensions: ['.json', '.js', '.jsx', '.css', '.hbs']
  }
};
