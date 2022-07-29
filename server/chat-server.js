import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js"
import { getFirestore, doc, getDoc, getDocs, collection, onSnapshot, addDoc, query, where, orderBy, limit} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
//https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js
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

const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app)

const user = auth.currentUser;
const messagesRef = collection(db, "messages");
let uid

/*
const messagesRef = firestore.collection('messages')
const query = messagesRef.orderBy('createdAt').limit(25);

*/

const topBtns = document.querySelectorAll('.top-btn')
const sendbtn = document.getElementById('send')
const inputEl = document.getElementById('input')
const chatEl = document.getElementById('chat')

let Username
let pfplink

async function LoadMessages(user) {
  const q = query(messagesRef, orderBy('timestamp'), limit(25));

    const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  const msgEl = document.createElement('div');
  msgEl.classList.add('message-container')
  //recieved goes here 
  msgEl.innerHTML = `
  <div class="message-container ${mode}">
    <div class="msg-container">
      <div class="username-container">${doc.data().user}</div>

        <img src="${doc.data().pfp}" alt="">
          <div class="message">
            <p id="user-message">${doc.data().text}</p>
          </div>
    </div>
</div>
  
  `
  chatEl.appendChild(msgEl)
   chatEl.scrollTop = chatEl.scrollHeight;
});
}

if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
  
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    uid = user.uid;
  }
  



onAuthStateChanged(auth, (user) => {
      if (user) {
      uid = user.uid;
      //get pfp
      getDownloadURL(ref(storage, auth.currentUser.uid))
              .then((url) => {
                if (!(url === "")) {
                  SetInfo(url, user)
                }
              })
              .catch((error) => {
                console.log(error)
              });

    } else {
      window.location = '/views/index.html'
    }
    });

  //User settings btn
topBtns[1].addEventListener("click", () => {
  window.location = "/views/user-settings.html";
})


//signout btn
topBtns[0].addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location = '/views/index.html'
  }).catch((error) => {
    alert(error)
  });
})

sendbtn.addEventListener("click", () => {
  SendMessage()
})

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    SendMessage()
  }
});


function SendMessage() {
  if (!(inputEl.value === "")) {
    let userInput = inputEl.value;
  inputEl.value = "";
  const msgEl = document.createElement('div');
  msgEl.classList.add('message-container')
  //recieved goes here 
  msgEl.innerHTML = `
  <div class="message-container ">
    <div class="msg-container">
      <div class="username-container">${Username}</div>

        <img src="${pfplink}" alt="">
          <div class="message">
            <p id="user-message">${userInput}</p>
          </div>
    </div>
</div>
  
  `
  chatEl.appendChild(msgEl)
   chatEl.scrollTop = chatEl.scrollHeight;

   //send to server
   sendToServer(userInput, pfplink, Username)
}}

function SetInfo(url, user) {
  pfplink = url
  if (pfplink === "") {
    pfplink = "/imgs/default-user-img.svg"
  }
  Username = user.displayName

  LoadMessages(user)
}

async function sendToServer(userInput, pfplink, Username, uid) {
  // Add a new document with a generated id.
const docRef = await addDoc(messagesRef, {
  text: userInput,
  timestamp: Date.now(),
  pfp: pfplink,
  user: Username,
});
console.log("Document written with ID: ", docRef.id);
}
