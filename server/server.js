const express = require('express');
const path = require('path');
import { ApolloServer } from 'apollo-server-express';
const bodyParser = require('body-parser');
const schema = require('./schema').default;
const rootValue = require('./index').default
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfigClient = require('../webpack.config.client.js');

const db = require('./db/config/config')

const app = express();

//database 
db.sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch((err) => {
  console.log('Unable to connect to the database:', err);
});

//Apollo Server
const server = new ApolloServer({
  // These will be defined for both new or existing servers
  schema,
  rootValue,
});

server.applyMiddleware({ app }); // app is from an existing express app

app.use(bodyParser.json());
// app.use('/graphql', expressGraphQL({
//   schema,
//   rootValue,
//   graphiql: true
// }));
app.use(express.static(path.join(__dirname,'dist')));

//app.use(webpackMiddleware(webpack(webpackConfigClient)));

module.exports = app;
