const loginPage = document.querySelector('.login-container');
const signupPage = document.querySelector('.signup-container')
let loginLine = document.querySelectorAll('.input-field')
const errorMsg = document.querySelector('.error-msg')
 
//switch pages
function switchToSignUp() {
    loginPage.style.display = "none";
    signupPage.style.display = "block";
}

function switchToLogin() {
    loginPage.style.display = "block";
    signupPage.style.display = "none";
}

