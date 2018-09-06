require('dotenv').config();
console.log(process.env.DEBUG);
const express = require('express');
var handlebars = require('express-handlebars');
const path = require('path');
import { ApolloServer } from 'apollo-server-express';
const bodyParser = require('body-parser');
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = require('./schema').default;
const resolvers = require('./index').default
import serverRoutes from "./middleware/routes";
import { initializeFirebaseApp ,loginWithFirebase, verifyToken } from './auth/firebase-auth'

const db = require('./db/config/config')
const app = express();

app.use(express.static('dist'));

// set up Hbs
app.set('views', path.join(process.cwd(), '/shared/views'));  
app.engine('hbs', handlebars());
app.set('view engine', 'hbs');

var router = express.Router();
app.use(router);

//initialize the firebase app with FirebaseAdmin and Firebase SDK
initializeFirebaseApp();

app.get('/auth/login', (req, res) => {
  
  //TODO: Check user credentials 
        //- fetch user by email id
        //- check password with argon2

        //if user is valid generate token with jwt
  let uid = 'KP6XZjhdIrU8Y9M3Mc9L1PKIJW52';
  loginWithFirebase(uid).then(accessToken => {
    res.json({ success: true, accessToken: accessToken });
    
  }).catch(error => {
    res.json({ success: false, message: error });
  });

  //res.json({ success: true, firebaseToken: customToken });

});

var guard = require('express-jwt-permissions')({
  requestProperty: 'identity',
  permissionsProperty: 'scope'
})

const errorHandler = (err, req, res, next) => {
    if (err.code === 'permission_denied') {
      res.status(403).send('Forbidden');
    }
}
 
app.get('/user', guard.check(['user:read']), errorHandler,  function(req, res) { 
  res.json({success: true})
 })


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
