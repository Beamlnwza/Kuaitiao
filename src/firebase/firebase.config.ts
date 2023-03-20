// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: 'AIzaSyCFtiZNvQrzoWitCj16MMA7AG0clfAe5us',
  authDomain: 'kuaitiao-bd349.firebaseapp.com',
  projectId: 'kuaitiao-bd349',
  storageBucket: 'kuaitiao-bd349.appspot.com',
  messagingSenderId: '950346172100',
  appId: '1:950346172100:web:5150c8876b2221c5fb2b91',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
export default firebaseApp
export { db, auth }
