require('dotenv').config();
console.log(process.env.DEBUG);
const express = require('express');
var handlebars = require('express-handlebars');
const path = require('path');
import { ApolloServer } from 'apollo-server-express';
const bodyParser = require('body-parser');
import { makeExecutableSchema } from 'graphql-tools'
const firebaseAdmin = require('firebase-admin');

const typeDefs = require('./schema').default;
const resolvers = require('./index').default
import serverRoutes from "./middleware/routes";
import { initializeFirebaseApp } from './auth/firebase-auth'

const db = require('./db/config/config')
const app = express();

app.use(express.static('dist'));

// set up Hbs
app.set('views', path.join(process.cwd(), '/shared/views'));  
app.engine('hbs', handlebars());
app.set('view engine', 'hbs');

var router = express.Router();
app.use(router);


app.get('/auth/login', (req, res) => {
  
  //TODO: Check user credentials 
        //- fetch user by email id
        //- check password with argon2

        //if user is valid generate token with jwt
  let uid = 'jwttokenjwttokenjwttoken';
  initializeFirebaseApp();

  // Mint token using Firebase Admin SDK
  firebaseAdmin.auth().createCustomToken(uid)
    .then(customToken => 
      // Response must be an object or Firebase errors
      res.json({firebaseToken: customToken})
    )
    .catch(err => 
      res.status(500).send({
        message: 'Something went wrong acquiring a Firebase token.',
        error: err
      })
    );
});


const schema = makeExecutableSchema({typeDefs, resolvers})

//Apollo Server
const server = new ApolloServer({
  // These will be defined for both new or existing servers
  schema,
  //rootValue
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

export default app;
