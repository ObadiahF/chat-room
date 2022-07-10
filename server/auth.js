import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

const LoginSubmit = document.getElementById("Login-submit")
const SignupSubmit = document.getElementById("Signup-Submit")
const errorMsg = document.querySelectorAll('.error-msg')
const loginLine = document.querySelectorAll('.input-field')

const firebaseConfig = {
  apiKey: "AIzaSyAdna8cjCjq4D4gimsSGuqIuhO5isTKDhg",
  authDomain: "hydrasms-f200e.firebaseapp.com",
  projectId: "hydrasms-f200e",
  storageBucket: "hydrasms-f200e.appspot.com",
  messagingSenderId: "479390971574",
  appId: "1:479390971574:web:7fb256c39c0b06a7ce5817",
  measurementId: "G-68F7T6RP7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
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


//login process
LoginSubmit.addEventListener("click",(e) => {
    event.preventDefault()
    //form validation
    if (!(document.Login.Email.value.includes("@")) || document.Login.Pass.value == "") {
        errorMsg[0].innerHTML = "Please Fill Out Login Credentials"
        errorMsg[0].style.display = "block";
    for (let i = 0; i < loginLine.length; i++) {
        loginLine[i].style.borderColor = "#F77559";
        loginLine[i].style.setProperty("--g", "red");
        loginLine[i].value = "";
    }
    } else {
        const email = document.Login.Email.value;
        const password = document.Login.Pass.value;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("Signed in successfully")
         })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const err = errorMessage.replace("Firebase: ", "")
            errorMsg[0].innerHTML = err;
            errorMsg[0].style.display = "block";
            for (let i = 0; i < loginLine.length; i++) {
            loginLine[i].style.borderColor = "#F77559";
            loginLine[i].style.setProperty("--g", "red");
            loginLine[i].value = "";
            }
        });
    }
})

//sign up process
SignupSubmit.addEventListener("click",(e) => {
    event.preventDefault()
    //form validation
    if (!(document.Signup.Email1.value.includes("@")) || !(document.Signup.Pass1.value === document.Signup.ConPass.value)) {
        errorMsg[1].innerHTML = "Please Fill Out Login Credentials Correctly"
        errorMsg[1].style.display = "block";
    for (let i = 0; i < loginLine.length; i++) {
        loginLine[i].style.borderColor = "#F77559";
        loginLine[i].style.setProperty("--g", "red");
        loginLine[i].value = "";
    }
    } else {
        const password = document.Signup.Pass1.value;
        const email = document.Signup.Email1.value;

            createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        alert("account Successfully made!")
    })
            .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const err = errorMessage.replace("(auth/weak-password)." , "")
        const err1 = err.replace("Firebase: ", "")
        errorMsg[1].innerHTML = err1;
        errorMsg[1].style.display = "block";
        for (let i = 0; i < loginLine.length; i++) {
            loginLine[i].style.borderColor = "#F77559";
            loginLine[i].style.setProperty("--g", "red");
            loginLine[i].value = "";
        }
    });
    }
})

//signing in
onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location = '/views/user-settings.html'
      const uid = user.uid;
    } else {
      console.log("not signed in")
    }
  });