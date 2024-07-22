import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCcaObUQN5INVywbBkwfrvrHlTtB3koVuc",
  authDomain: "fir-logion.firebaseapp.com",
  projectId: "fir-logion",
  storageBucket: "fir-logion.appspot.com",
  messagingSenderId: "994681346068",
  appId: "1:994681346068:web:031ad74cfc43ce143f2f01"
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);

// Firebase Authenticationの初期化
const auth = getAuth(app);
const provider = new GoogleAuthProvider();  // new キーワードを使用してインスタンス化

// Firestoreの初期化
const db = getFirestore(app); // 追加

// Firebase Realtime Databaseの初期化
const database = getDatabase(app);

export { auth, provider, db, database };