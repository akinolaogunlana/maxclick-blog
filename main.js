// main.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCqgfH_fX69EqBe5iOmN7F1E09gGj4zW60",
  authDomain: "animated-way-426007-p6.firebaseapp.com",
  projectId: "animated-way-426007-p6",
  storageBucket: "animated-way-426007-p6.appspot.com",
  messagingSenderId: "33587602209",
  appId: "1:33587602209:web:818e58f30a2886eb4b9460"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Load posts from Firestore
const postsContainer = document.getElementById("posts");

async function loadPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const post = doc.data();
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <small>🕒 ${post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleString() : "Unknown Date"}</small>
    `;
    postsContainer.appendChild(div);
  });
}

loadPosts();