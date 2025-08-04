import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  // your firebase config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const postsContainer = document.getElementById("postsContainer");
const totalViews = document.getElementById("totalViews");
const totalEarnings = document.getElementById("totalEarnings");

onAuthStateChanged(auth, async (user) => {
  if (!user) return (window.location.href = "/login.html");

  const q = query(collection(db, "posts"), where("authorId", "==", user.uid));
  const querySnapshot = await getDocs(q);

  let views = 0;
  let earnings = 0;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    views += data.views || 0;
    earnings += data.earnings || 0;

    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${data.title}</h3>
      <p>Status: ${data.status}</p>
      <p>Views: ${data.views || 0}</p>
      <p>Earnings: $${(data.earnings || 0).toFixed(2)}</p>
      <button onclick="editPost('${doc.id}')">Edit</button>
    `;
    postsContainer.appendChild(div);
  });

  totalViews.textContent = views;
  totalEarnings.textContent = `$${earnings.toFixed(2)}`;
});

document.getElementById("logoutBtn").onclick = () => {
  signOut(auth).then(() => {
    window.location.href = "/login.html";
  });
};

window.editPost = function(postId) {
  window.location.href = `edit.html?id=${postId}`;
};