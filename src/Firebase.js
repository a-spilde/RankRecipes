
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD4thh7Y3tgG760HNRbm7gCnlViiXQL7p4",
  authDomain: "recipe-ranker-589de.firebaseapp.com",
  projectId: "recipe-ranker-589de",
  storageBucket: "recipe-ranker-589de.appspot.com",
  messagingSenderId: "56234142275",
  appId: "1:56234142275:web:2ad516b9c389445b11c2f6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()
export const db = getFirestore();

export const signInWithGoogle = async () => {
    await signInWithPopup(auth,provider).then((result) => {

        const email = result.user.email
        const name = result.user.displayName

        localStorage.setItem("name", name)
        localStorage.setItem("email", email)

    }).catch((error => {
        console.log(error)
    }));
}