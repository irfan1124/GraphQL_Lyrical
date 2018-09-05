let config = {
    apiKey: 'AIzaSyCM-iqOcM3hwiun5T9SRPuzylxVRxdsRQ4',
    authDomain: 'test-project-163e9.firebaseapp.com',
    databaseURL: 'https://test-project-163e9.firebaseio.com',
    projectId: 'test-project-163e9',
    storageBucket: 'test-project-163e9.appspot.com',
    messagingSenderId: '647094773437'
};

module.exports = {
    FIREBASE_KEY: require('./serviceAccountKey.json'), // e.g., your-project-firebase-adminsdk-xxxxx-xxxxxxxxxx.json
    FIREBASE_DB: 'https://test-project-163e9.firebaseio.com', // e.g., https://your-project.firebaseio.com
    FIREBASE_SDK_CONFIG: config
};