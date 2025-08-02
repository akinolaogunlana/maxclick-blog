// main.js

// Step 1: Firebase Config - Replace with your actual Firebase project settings
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

// Step 2: Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Step 3: Fetch and display posts
const postsContainer = document.getElementById("posts");

db.collection("posts").orderBy("createdAt", "desc").get().then(snapshot => {
  snapshot.forEach(doc => {
    const post = doc.data();
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <small>🕒 ${new Date(post.createdAt.toDate()).toLocaleString()}</small>
    `;
    postsContainer.appendChild(div);
  });
});
