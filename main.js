// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqgfH_fX69EqBe5iOmN7F1E09gGj4zW60",
  authDomain: "animated-way-426007-p6.firebaseapp.com",
  databaseURL: "https://animated-way-426007-p6-default-rtdb.firebaseio.com",
  projectId: "animated-way-426007-p6",
  storageBucket: "animated-way-426007-p6.appspot.com",
  messagingSenderId: "33587602209",
  appId: "1:33587602209:web:818e58f30a2886eb4b9460",
  measurementId: "G-LGG4K6E22F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM elements
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postsContainer = document.getElementById('posts');

// Handle form submission
postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const timestamp = Date.now();

  if (!title || !content) return;

  const newPostRef = db.ref('posts').push();
  newPostRef.set({ title, content, timestamp });

  postForm.reset();
});

// Fetch and render posts
db.ref('posts').on('value', (snapshot) => {
  postsContainer.innerHTML = '';

  const posts = snapshot.val();
  if (posts) {
    const sortedPosts = Object.entries(posts).sort((a, b) => b[1].timestamp - a[1].timestamp);
    sortedPosts.forEach(([id, post]) => {
      const div = document.createElement('div');
      div.className = 'post';
      div.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <small>${new Date(post.timestamp).toLocaleString()}</small>
        <hr>
      `;
      postsContainer.appendChild(div);
    });
  } else {
    postsContainer.innerHTML = '<p>No posts yet.</p>';
  }
});