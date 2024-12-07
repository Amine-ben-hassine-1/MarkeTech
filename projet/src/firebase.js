import { initializeApp } from 'firebase/app';
import { getFirestore, FieldValue } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAl1_AlfXN0Bp9dddSZBluaVlcws4-exkQ",
  authDomain: "projet-7e51d.firebaseapp.com",
  projectId: "projet-7e51d",
  storageBucket: "projet-7e51d.appspot.com",
  messagingSenderId: "198413426771",
  appId: "1:198413426771:web:eebfddf57168f60ed266a6"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore et Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Export des objets db et auth
export { db, auth, FieldValue };
