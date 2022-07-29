import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js"
const fileInput = document.getElementById('file')
const pfp = document.getElementById('pfp')
const done = document.getElementById('done')
const err = document.getElementById("error-msg")
const signoutBtn = document.getElementById('sign-out')
const userTxt = document.getElementById('user')
const UserInput = document.getElementById('username')
let file;
let username = "";
let blobURL
let pfpRef
let newImage = false;

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
const storage = getStorage(app);



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
  



onAuthStateChanged(auth, (user) => {
      if (user) {
      const uid = user.uid;
      UserInput.value = auth.currentUser.displayName;
      userTxt.innerHTML = auth.currentUser.displayName;

      //get pfp
      getDownloadURL(ref(storage, auth.currentUser.uid))
              .then((url) => {
                if (url == undefined) {
                  pf.setAttribute('src', "/img/default-user-img.svg")
                } else {
                  pfp.setAttribute('src', url);
                }
              })
              .catch((error) => {
                console.log(error)
              });

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
            displayName: username,
            test: 2
          }).then(() => {
            err.style.color = "lime";
            err.innerHTML = "Profile Successfully Updated";
            err.style.display = "block";
            UserInput.value = auth.currentUser.displayName;
            userTxt.innerHTML = auth.currentUser.displayName;
            if (file == undefined) {

              uploadBytes(ref(storage, auth.currentUser.uid), "https://firebasestorage.googleapis.com/v0/b/hydrasms-f200e.appspot.com/o/user-svgrepo-com.svg?alt=media&token=1d8446cf-084d-4e51-8d20-83016df832cc").then((snapshot) => {
                console.log("Profile picture successfully uploaded")
              }).catch((error) => {
                err.style.color = "red";
              err.innerHTML = error;
              err.style.display = "block";
              })
            }
            if (newImage === true) {
              //pfp
            uploadBytes(ref(storage, auth.currentUser.uid), file).then((snapshot) => {
              console.log("Profile picture successfully uploaded")
            }).catch((error) => {
              err.style.color = "red";
            err.innerHTML = error;
            err.style.display = "block";
            })
            newImage = false;
            } else {
            }
          }).catch((error) => {
            console.log(error)
            err.style.color = "red";
            err.innerHTML = error;
            err.style.display = "block";
          });
          setTimeout(() => {
            window.location = '/views/chat.html'
          }, 2000);
    }

})

//for pfp
fileInput.addEventListener("change", (e) => {
    file = e.target.files[0];
    blobURL = window.URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;
    pfp.src = img.src
    newImage = true;
    return file;
})

signoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location = '/views/index.html'
      }).catch((error) => {
        alert(error)
      });
})
