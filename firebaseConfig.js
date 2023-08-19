import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCBcb8xymG5aMwXe6N15P042jh0ZySwTGM',
  authDomain: 'ifarmers-dc678.firebaseapp.com',
  projectId: 'ifarmers-dc678',
  storageBucket: 'ifarmers-dc678.appspot.com',
  messagingSenderId: '1:523965426715:android:51439439f1f99681bcdcbe',
  appId: '1:523965426715:android:51439439f1f99681bcdcbe',
  // measurementId: "YOUR_MEASUREMENT_ID"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
