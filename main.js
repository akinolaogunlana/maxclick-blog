// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase config
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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const postsContainer = document.getElementById("posts");

// Submit Handler
postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) return;

  const postRef = ref(db, "posts");

  push(postRef, {
    title,
    content,
    timestamp: Date.now()
  });

  postForm.reset();
});

// Load posts from Firebase
const postRef = ref(db, "posts");
onValue(postRef, (snapshot) => {
  postsContainer.innerHTML = ""; // Clear posts

  snapshot.forEach((child) => {
    const post = child.val();
    const postEl = document.createElement("div");
    postEl.className = "post";
    postEl.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
    `;
    postsContainer.prepend(postEl); // Newest first
  });
});