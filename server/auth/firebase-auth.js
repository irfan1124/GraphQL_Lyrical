const config = require('./../config');

// Initialize Firebase Admin with service account
let initializeFirebaseApp = () =>{
    const serviceAccount = config.FIREBASE_KEY;
    firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: config.FIREBASE_DB
    });
}

module.exports = {
    initializeFirebaseApp: initializeFirebaseApp
}