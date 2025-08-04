// js/editor.js
import { auth, database } from './firebase-config.js';
import { ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Elements
const logoutBtn = document.getElementById("logoutBtn");
const saveBtn = document.getElementById("saveBtn");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const savedAlert = document.getElementById("savedAlert");

// Check authentication state
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});

// Save post
saveBtn.addEventListener("click", () => {
  const title = postTitle.value.trim();
  const content = postContent.value.trim();

  if (!title || !content) {
    alert("Title and content are required!");
    return;
  }

  const postRef = ref(database, `posts/${auth.currentUser.uid}`);
  push(postRef, {
    title,
    content,
    createdAt: new Date().toISOString()
  }).then(() => {
    showSavedAlert();
    postTitle.value = "";
    postContent.value = "";
  }).catch((error) => {
    console.error("Error saving post:", error);
    alert("Failed to save post.");
  });
});

// Show alert
function showSavedAlert() {
  savedAlert.style.display = "block";
  setTimeout(() => {
    savedAlert.style.display = "none";
  }, 3000);
                                            }
