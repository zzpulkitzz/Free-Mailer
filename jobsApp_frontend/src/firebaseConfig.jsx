import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgtIJqAAV1kmokrORCAapW1sxihwwZTME",
    authDomain: "free-mailer-29120.firebaseapp.com",
    projectId: "free-mailer-29120",
    storageBucket: "free-mailer-29120.firebasestorage.app",
    messagingSenderId: "1332550635",
    appId: "1:1332550635:web:4627af6865dbf4d1cf97ae",
    measurementId: "G-0FWJTTH6GT"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth};