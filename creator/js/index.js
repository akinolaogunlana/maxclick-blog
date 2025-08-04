// creator/js/index.js
import { app } from './firebase-config.js';
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

import {
  getDatabase,
  ref,
  onValue
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js';

const auth = getAuth(app);
const db = getDatabase(app);

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = 'login.html';
  } catch (error) {
    alert('Error signing out: ' + error.message);
  }
});

// Load posts for logged-in user
onAuthStateChanged(auth, user => {
  if (user) {
    const userId = user.uid;
    const postsRef = ref(db, 'posts/');
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '<li>Loading...</li>';

    onValue(postsRef, snapshot => {
      postsList.innerHTML = '';
      snapshot.forEach(childSnapshot => {
        const post = childSnapshot.val();
        if (post.authorId === userId) {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>${post.title}</strong><br/>
            <small>${new Date(post.timestamp).toLocaleString()}</small><br/>
            <p>${post.content.substring(0, 100)}...</p>
            <hr/>
          `;
          postsList.appendChild(li);
        }
      });

      if (postsList.innerHTML === '') {
        postsList.innerHTML = '<li>No posts found.</li>';
      }
    });
  } else {
    // Not logged in
    window.location.href = 'login.html';
  }
});
