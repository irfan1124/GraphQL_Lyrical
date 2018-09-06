import firebaseAdmin from 'firebase-admin';
import firebase from 'firebase';

import { replaceAll, trim } from '../../shared/format/string';


const config = require('./../config');

// Initialize Firebase Admin with service account
let initializeFirebaseApp = () => {
    const serviceAccount = config.FIREBASE_KEY;
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: config.FIREBASE_DB
    });
    firebase.initializeApp(config.FIREBASE_SDK_CONFIG);
}

//function to etract the token from authorization header
let extractToken = (bearer) => {
    if (bearer) {
        return trim(replaceAll(bearer, 'Bearer', ''));
    }
    return null;
};

//middleware function to verify the token issued by firebase
let verifyToken = function (req, res, next) {
    console.log('verify middleware');
    console.log(req);

    //req = {...req, token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImEwY2ViNDY3NDJhNjNlMTk2NDIxNjNhNzI4NmRjZDQyZjc0MzYzNjYifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzdC1wcm9qZWN0LTE2M2U5IiwiQXV0aCI6eyJDb21wYW55Ijp0cnVlfSwiYXVkIjoidGVzdC1wcm9qZWN0LTE2M2U5IiwiYXV0aF90aW1lIjoxNTM2MTM5MzAzLCJ1c2VyX2lkIjoiS1A2WFpqaGRJclU4WTlNM01jOUwxUEtJSlc1MiIsInN1YiI6IktQNlhaamhkSXJVOFk5TTNNYzlMMVBLSUpXNTIiLCJpYXQiOjE1MzYxMzkzMDQsImV4cCI6MTUzNjE0MjkwNCwiZW1haWwiOiJ0ZXN0QHRlc3QuY20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNtIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.SofXGHJtmx-YnvdLP-18xyDDonPRljT3E6iNDcbgBpmAwguRaB7VLt9Def3PtMpAjo3RUJJbibX8OOEPm4Xlfut1fQohtdTEQuUW2fnfC_Oz9RLupC7xqLmvO6QdQhQqiOeTmU3aBj_ELVEcBiBENEO7e9tZO6TVEUOhdrtsrbI7hQkscwgODTdMzY9ltC_qTWEfMy4Dsxwhqqt5hqJ_kbxBIsZCnOoDXyHMCpfZ_QaH36dNgKKXVZ86HswOnwMn98EWopZFnB2hTlIg4BrBUNVERyR4683UEVEYxl-G2lapJl5mJ78wf5khmMroPu5N-YGtKY9qnFRNIWk3wAmTNg'}
    console.log('req.params.token : ', 'token');
    firebaseAdmin.auth().verifyIdToken('token').then(isVerified => {
        console.log(isVerified);
        next();
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
    next();
};

// Mint token using Firebase Admin SDK
let loginWithFirebase = (uid) => {
    let additionalClaims = {
        "scopes":  "user:read"
    }
    return firebaseAdmin.auth().createCustomToken(uid, additionalClaims)
        .then(customToken => {
            console.log('custom token : ', customToken)
            // Response must be an object or Firebase errors
            return firebase.auth().signInWithCustomToken(customToken).then(({ user }) => {
                //To get the Access token from firebase
               return user.getIdToken().then(token => {
                    console.log(token);
                    return token;
                });
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                return 'Server error!';
            });
        }
            //res.json({firebaseToken: customToken});
        )
        .catch(err => {
            return err
        });
}

module.exports = {
    initializeFirebaseApp: initializeFirebaseApp,
    loginWithFirebase: loginWithFirebase,
    verifyToken: verifyToken
}