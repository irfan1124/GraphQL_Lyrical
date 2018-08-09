const express = require('express');
var handlebars = require('express-handlebars');
const path = require('path');
import { ApolloServer } from 'apollo-server-express';
const bodyParser = require('body-parser');
const schema = require('./schema').default;
const rootValue = require('./index').default
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfigClient = require('../webpack.config.client.js');
import serverRoutes from "./middleware/routes";

const db = require('./db/config/config')
const app = express();

// set up Hbs
app.set('views', path.join(process.cwd(), '/shared/views'));  
app.engine('hbs', handlebars());
app.set('view engine', 'hbs');

var router = express.Router();
app.use(router);

//Apollo Server
const server = new ApolloServer({
  // These will be defined for both new or existing servers
  schema,
  rootValue
});
app.use(bodyParser.json());
// app.use('/graphql', expressGraphQL({
//   schema,
//   rootValue,
//   graphiql: true
// }));
server.applyMiddleware({ app }); // app is from an existing express app

app.use(serverRoutes);

//database 
db.sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch((err) => {
  console.log('Unable to connect to the database:', err);
});

//app.use(webpackMiddleware(webpack(webpackConfigClient)));

export default app;
