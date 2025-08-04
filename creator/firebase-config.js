// creator/js/firebase-config.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyCqgfH_fX69EqBe5iOmN7F1E09gGj4zW60",
  authDomain: "animated-way-426007-p6.firebaseapp.com",
  databaseURL: "https://animated-way-426007-p6-default-rtdb.firebaseio.com",
  projectId: "animated-way-426007-p6",
  storageBucket: "animated-way-426007-p6.firebasestorage.app",
  messagingSenderId: "33587602209",
  appId: "1:33587602209:web:818e58f30a2886eb4b9460",
  measurementId: "G-LGG4K6E22F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export core services
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
