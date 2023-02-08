const email = document.getElementById("email");
const password = document.getElementById("Mot de passe");
const boutonConnexion=document.getElementById("connexion");

email.addEventListener('input', function() {
  console.log('Email : ', email.value);
});

password.addEventListener('input', function() {
  console.log('Mot de passe : ', password.value);
});

boutonConnexion.addEventListener("click", function() {
  connexion(email.value,password.value);
});
function connexion(email,password){
  fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "email": email,
    "password": password
  })
  })
  .then(response => response.json())
  .then(data => {console.log(data)
  })
  .catch(error => {console.error(error)
  })
  }

