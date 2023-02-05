var form = document.getElementById("form-login");

var email = document.getElementById("email");
var password = document.getElementById("Mot de passe");
console.log(password.value,email.value)
form.addEventListener("submit",connexion(email,password))
crossOrigin="anonymous"
function connexion(email,password){
    
    
fetch("https://localhost:5678/api/login", {
    headers: {
        'Content-Type': 'application/json'
      },
    method: "POST",
    body:{
        "email": email,
        "password": password
      }
})
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
};
