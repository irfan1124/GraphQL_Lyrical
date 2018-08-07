const express = require('express');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('./schema').default;
const rootValue = require('./index').default
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfigClient = require('../webpack.config.client.js');

const db = require('./db/config/config')

const app = express();

db.sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch((err) => {
  console.log('Unable to connect to the database:', err);
});

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  rootValue,
  graphiql: true
}));

app.use(webpackMiddleware(webpack(webpackConfigClient)));

module.exports = app;
