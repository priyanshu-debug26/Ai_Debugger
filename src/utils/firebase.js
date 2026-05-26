import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD9hgYiRbs0brnwS-Q1KrHxPtwBFdUUb50",
  authDomain: "ai-debugger-55146.firebaseapp.com",
  projectId: "ai-debugger-55146",
  storageBucket: "ai-debugger-55146.firebasestorage.app",
  messagingSenderId: "165216433507",
  appId: "1:165216433507:web:e77edd7eea15df2d0c0f56",
  measurementId: "G-NN148TVXKR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, analytics };
