import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

const fileInput = document.getElementById('file')
const pfp = document.getElementById('pfp')
const done = document.getElementById('done')
const err = document.getElementById("error-msg")
const signoutBtn = document.getElementById('sign-out')
const userTxt = document.getElementById('user')
const UserInput = document.getElementById('username')
let username = "";
//let pfplink = "";
let blobURL
let newimage = false;
let User

const firebaseConfig = {
    apiKey: "AIzaSyAdna8cjCjq4D4gimsSGuqIuhO5isTKDhg",
    authDomain: "hydrasms-f200e.firebaseapp.com",
    projectId: "hydrasms-f200e",
    storageBucket: "hydrasms-f200e.appspot.com",
    messagingSenderId: "479390971574",
    appId: "1:479390971574:web:7fb256c39c0b06a7ce5817",
    measurementId: "G-68F7T6RP7B"
};

const app = initializeApp(firebaseConfig)
const database = getDatabase(app);
const auth = getAuth();

const user = auth.currentUser;
if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
  
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }

function LoadInfo(user) {
  console.log(user.photoURL)
  pfp.src = user.photoURL
}

onAuthStateChanged(auth, (user) => {
  LoadInfo(auth.currentUser)
    if (user) {
      const uid = user.uid;
      UserInput.value = auth.currentUser.displayName;
      userTxt.innerHTML = auth.currentUser.displayName;
    } else {
      window.location = '/views/index.html'
    }
  });

//check for username that is isnt nothing
done.addEventListener("click", () => {
    if (UserInput.value === "") {
        err.style.color = "red";
        err.innerHTML = "You Cannot Leave This Field Blank"
        err.style.display = "block";
    } else {
      username = UserInput.value;
      //update pfp settings
        updateProfile(auth.currentUser, {
            displayName: username, photoURL: blobURL
          }).then(() => {
            err.style.color = "lime";
            err.innerHTML = "Profile Successfully Updated";
            err.style.display = "block";
            UserInput.value = auth.currentUser.displayName;
            userTxt.innerHTML = auth.currentUser.displayName;
            if (newimage === true) {
              const img = new Image();
              img.src = blobURL;
              const canvas = document.createElement('canvas');
              canvas.width = 80;
              canvas.height = 80;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, 80, 80);
              newimage = false;
            }

          }).catch((error) => {
            console.log(error)
            err.style.color = "red";
            err.innerHTML = error;
            err.style.display = "block";
            const img = new Image();
            img.src = blobURL;
            const canvas = document.createElement('canvas');
            canvas.width = 80;
            canvas.height = 80;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 80, 80);
            pfp.src = img.src;
          });
    }

})

//for pfp
fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    blobURL = window.URL.createObjectURL(file);
    newimage = true;
    const img = new Image();
    img.src = blobURL;
    const canvas = document.createElement('canvas');
    canvas.width = 80;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 80, 80);
    pfp.src = img.src;
})

signoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location = '/views/index.html'
      }).catch((error) => {
        alert(error)
      });
})
