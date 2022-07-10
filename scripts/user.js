const Input = document.getElementById('username')
const userTxt = document.getElementById('user')
const fileInput = document.getElementById('file')

Input.addEventListener('input', () => {
    Input.value = Input.value.toUpperCase()
    userTxt.innerHTML = Input.value.toUpperCase();
})


function ChangePhoto() {
  fileInput.click();
}
