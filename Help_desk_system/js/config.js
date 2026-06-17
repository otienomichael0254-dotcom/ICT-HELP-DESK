// Firebase Configuration
// Replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyAAQQPe6VSUYcFfJCWbhq5QokKS1pdYQow",
  authDomain: "helpdesksystem-84b10.firebaseapp.com",
  projectId: "helpdesksystem-84b10",
  storageBucket: "helpdesksystem-84b10.firebasestorage.app",
  messagingSenderId: "953130481882",
  appId: "1:953130481882:web:b84b01912f10babb6bcde3"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
// Configure Firestore
// Firestore default settings are fine for current SDK; removed deprecated settings to avoid warnings.
