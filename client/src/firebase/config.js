import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyB64RG-rc4sbcIOdRyMkO0gwVKqEufiW5k",
  authDomain: "e-care-d9e6a.firebaseapp.com",
  projectId: "e-care-d9e6a",
  storageBucket: "e-care-d9e6a.appspot.com",
  messagingSenderId: "483062788212",
  appId: "1:483062788212:web:4a66dd8ee045d605a72121",
  measurementId: "G-SJC57DNPHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = ()=>{
  return signInWithPopup(auth,provider)
}