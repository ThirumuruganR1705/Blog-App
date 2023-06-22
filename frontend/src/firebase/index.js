// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbzYBzjUNhMWpVuWZUOa2YYB4oXiFslhA",
  authDomain: "my-blog-app-1ff74.firebaseapp.com",
  projectId: "my-blog-app-1ff74",
  storageBucket: "my-blog-app-1ff74.appspot.com",
  messagingSenderId: "489917799885",
  appId: "1:489917799885:web:7bcbce6bf0c507cea9f884"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let storage=getStorage(app);
export default storage;