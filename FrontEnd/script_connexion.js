const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("Mot-de-passe");

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
    
      sessionStorage.setItem('token',data.token)
      window.location.href = "./index.html";
    })
    .catch(error => {
      console.error(error);
    });
});
