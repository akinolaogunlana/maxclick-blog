import { auth } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

// Protect routes/pages
export function protectRoute(redirectTo = '../creator/login.html') {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Not logged in - redirect to login page
      window.location.href = redirectTo;
    }
  });
}

// Get current user details
export function getCurrentUser(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
}
