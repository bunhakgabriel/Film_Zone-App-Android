import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyBrrwhRTYdn3yp0blw-dUqvEXjRqmXYSyg",
    authDomain: "film-zone-64846.firebaseapp.com",
    projectId: "film-zone-64846",
    storageBucket: "film-zone-64846.appspot.com",
    messagingSenderId: "849337877207",
    appId: "1:849337877207:web:1762deada6c4ee06486692",
    measurementId: "G-M5D1M1L57E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };