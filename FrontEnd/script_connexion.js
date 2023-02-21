const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("Mot-de-passe");
const bouton_projet=document.querySelector(".bouton-projet")
bouton_projet.addEventListener('click',function(){window.location.href = "./index.html"})
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
        alert('E-mail ou mot de passe incorrect. Veuillez réessayer.');
      }
      login(data)
      
    })
    .catch(error => {
      console.error(error);
      alert('Incorrect email or password. Please try again.');
    });
});
function tokenAdmin(data){
  if(email.value=="sophie.bluel@test.tld"){
    if(localStorage.getItem('token') == 'undefined'){
    return false}
    else{    
      localStorage.setItem('trueToken',data.token)
      return true
    }
  }
 
}
function login(data){
  if (tokenAdmin(data)==true ){
    console.log(localStorage)
    window.location.href = "./index.html";
  }
}