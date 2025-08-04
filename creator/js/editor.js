// creator/js/editor.js

import { auth, db, storage } from './firebase-config.js';
import { ref as dbRef, push, set } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

// DOM Elements
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const thumbnailInput = document.getElementById('thumbnail');
const previewSection = document.getElementById('preview');
const publishButton = document.getElementById('publishBtn');
const previewButton = document.getElementById('previewBtn');
const usernameInput = document.getElementById('username');
const logoutButton = document.getElementById('logoutBtn');

// Auto-fill username for current user
onAuthStateChanged(auth, (user) => {
  if (user) {
    const name = user.displayName || user.email.split('@')[0];
    usernameInput.value = name;
  } else {
    // Redirect to login if not authenticated
    window.location.href = 'login.html';
  }
});

// Logout functionality
logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = 'login.html';
  });
});

// Preview Function
previewButton.addEventListener('click', () => {
  const title = titleInput.value;
  const content = contentInput.value;

  previewSection.innerHTML = `
    <h3>${title}</h3>
    <p>${content}</p>
  `;
  previewSection.style.display = 'block';
});

// Publish Function
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const username = usernameInput.value.trim();
  const thumbnailFile = thumbnailInput.files[0];

  if (!title || !content || !username || !thumbnailFile) {
    alert('Please fill in all fields and upload a thumbnail.');
    return;
  }

  try {
    // Upload thumbnail
    const storageReference = storageRef(storage, `thumbnails/${Date.now()}_${thumbnailFile.name}`);
    await uploadBytes(storageReference, thumbnailFile);
    const thumbnailURL = await getDownloadURL(storageReference);

    // Save post to Realtime Database
    const postReference = push(dbRef(db, 'posts'));
    await set(postReference, {
      title,
      content,
      username,
      thumbnailURL,
      createdAt: new Date().toISOString()
    });

    alert('Post published successfully!');
    postForm.reset();
    previewSection.innerHTML = '';
    previewSection.style.display = 'none';
  } catch (error) {
    console.error('Error publishing post:', error);
    alert('Failed to publish post. Please try again.');
  }
});
