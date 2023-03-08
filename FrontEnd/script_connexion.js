
const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("Mot-de-passe");
const bouton_projet=document.querySelector(".bouton-projet")
const boutonLogin=document.querySelector('.bouton-login');
boutonLogin.style.fontWeight="600"
form.addEventListener("submit", function(event) {
  event.preventDefault();

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email.value,
      "password": password.value
    })
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token',data.token)
      if(localStorage.getItem('token')=="undefined"){
        alert('Email ou mot de passe éronné.Veuillez réessayer.');
      }
      login()
      
    })
    .catch(error => {
      console.error(error);
      
    });
});
function tokenAdmin(){
  if(email.value=="sophie.bluel@test.tld"){
    if(localStorage.getItem('token') == 'undefined'){
    return false}
    else{ 
      return true
    }
  }
 
}
function login(){
  if (tokenAdmin()==true ){
    console.log(localStorage)
    window.location.href = "./index.html";
  }
}
function authorize() {

  console.log(localStorage.getItem('token'))
  if(localStorage.getItem('token')!='undefined'){
    if(localStorage.getItem('token')!=null){
    window.location.href = "./index.html";
  }}
}
authorize()