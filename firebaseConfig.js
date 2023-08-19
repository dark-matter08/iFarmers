import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCBcb8xymG5aMwXe6N15P042jh0ZySwTGM',
  authDomain: 'ifarmers-dc678.firebaseapp.com',
  projectId: 'ifarmers-dc678',
  storageBucket: 'ifarmers-dc678.appspot.com',
  messagingSenderId: '1:523965426715:android:51439439f1f99681bcdcbe',
  appId: '1:523965426715:android:51439439f1f99681bcdcbe',
  // measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize the Firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
