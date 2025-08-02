// main.js

// Your web app's Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM element to display posts
const postsContainer = document.getElementById("posts");

// Fetch and display posts from Realtime Database
database.ref("posts").orderByChild("createdAt").on("value", (snapshot) => {
  postsContainer.innerHTML = ""; // Clear previous content
  const data = snapshot.val();
  if (data) {
    const postsArray = Object.entries(data).sort((a, b) => b[1].createdAt - a[1].createdAt);
    postsArray.forEach(([id, post]) => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content.length > 300 ? post.content.slice(0, 300) + "..." : post.content}</p>
        <small>🕒 ${new Date(post.createdAt).toLocaleString()}</small>
        <hr>
      `;
      postsContainer.appendChild(div);
    });
  } else {
    postsContainer.innerHTML = "<p>No posts found.</p>";
  }
});