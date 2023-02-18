let zone_images = document.querySelector(".gallery");
const bouton_Hotel = document.querySelector(".bouton-Hotel");
const bouton_Appartements = document.querySelector(".bouton-Appartements");
const bouton_Objets = document.querySelector(".bouton-Objets");
const bouton_Tous = document.querySelector(".bouton-Tous");
const bouton_edition = document.querySelector('.bouton-edition')
const page_edition = document.querySelector('#page-edition')
const ajout_photo = document.querySelector('.ajout-photo')
const zoneEdition = document.querySelector('#zone-mode-edition')
const portfolio_edit = document.querySelector('.portfolio-edit')
bouton_login=document.querySelector(".bouton-login")
const category=document.querySelector('#category')
bouton_login.addEventListener('click',function(){loginCheck()})
bouton_Tous.addEventListener("click", function () { reset(bouton_Tous.textContent) });
bouton_Objets.addEventListener("click", function () { reset(bouton_Objets.textContent) });
bouton_Appartements.addEventListener("click", function () { reset(bouton_Appartements.textContent) });
bouton_Hotel.addEventListener("click", function () { reset(bouton_Hotel.textContent) });


function tri(data, type) {
  let tableau_trié = []
  console.log(data)
  if (type == 'Tous') { renderWorks(data) }

  else {
    for (let travaux in data) {
      console.log(data[travaux]['category']['name'])
      if (data[travaux]['category']['name'] == type) {
        tableau_trié.push(data[travaux]);
      }

    }
    console.log('tableau trié', tableau_trié)
    renderWorks(tableau_trié)
  }


}
function reset(type) {
  console.log('reset')
  zone_images.innerHTML = "";
  getWorks().then(
    data => tri(data, type));




}
function previewImage(event) {
  var input = event.target;
  var preview = document.getElementById("preview");

  var reader = new FileReader();
  reader.onload = function() {
    preview.src = reader.result;
  };
  reader.readAsDataURL(input.files[0]);
}
function renderWorks(works) {
  zone_images = document.querySelector(".gallery");
  works.forEach(projet => {
    let img = document.createElement("img");
    let figure = document.createElement("figure")
    let figcap = document.createElement("figcaption")
    img.src = projet.imageUrl;
    img.crossOrigin = "anonymous";
    figure.appendChild(img)
    figcap.innerHTML = projet.title
    figure.appendChild(figcap)
    zone_images.appendChild(figure);
  });
}
function renderWorksEdit(works) {
  works.forEach(projet => {
    let img = document.createElement("img");
    let figcap = document.createElement("figcaption")
    let imgGallery = document.createElement("div")
    imgGallery.className = 'imgGallery'
    let boutonDel = document.createElement("div")
    boutonDel.className = 'boutonDel'
    boutonDel.addEventListener('click',function(){removeImage(boutonDel)})
    img.src = projet.imageUrl;
    img.crossOrigin = "anonymous";
    figcap.innerHTML = 'éditer';
    imgGallery.appendChild(img);
    zone_images.appendChild(imgGallery)
    imgGallery.appendChild(figcap);
    imgGallery.appendChild(boutonDel)
  });
}
function loginCheck(){
  console.log(bouton_login.textContent)
  if(bouton_login.textContent=='login'){

    window.location.href = "./page_login.html"}

else{
  logout()
  effaceEdition()
  bouton_login.textContent='login'}

}
function logout(){
  sessionStorage.removeItem('token')
}
function renderCategoryList(categoryList){ 
  console.log('categoryList',categoryList)
  categoryList.forEach(type =>{
  console.log('type',type)
  let option=document.createElement('option')
  option.value=type['id']
  option.textContent=type['name']
  category.appendChild(option)});}
  
function getCategory() {
  return fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
      console.log("data type", data);
      return data
    })
    .catch(error => console.error(error));
}
/**
 * Restitution des traveaux à partir de l'API
 * @returns 
 */
function getWorks() {
  return fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      console.log("data array", data);
      return data
    })
    .catch(error => console.error(error));
}
/**
 * Initialisation de la galerie d'aceuille
 */
function init() {
  getWorks().then(
    data => renderWorks(data));
}
/**
 * Verification de la presence d'un token
 */
function authorize() {
  let token = sessionStorage.getItem('token');
  let trueToken=sessionStorage.getItem('trueToken')
  console.log(token,trueToken)
  if (token == null) {
    console.log('le token n existe pas')
    effaceEdition()
  }
  if (token == 'undefined') {
    console.log('le token n existe pas')
    effaceEdition()
  }
  if (token==trueToken){
    if (trueToken != null) {
    bouton_login.textContent='logout'
    affichage_edition()
  }
}
}
function affichage_edition() {
  zoneEdition.style.display = "flex";
  bouton_edition.addEventListener("click", function () {
    page_edition.style.display = "flex";
    portfolio_edit.style.display = "flex"
    ajout_photo.style.display = 'none'
    getGalleryEdit()
  });
  page_edition.addEventListener('click', function () {
    clean(zone_images)
    ajout_photo.style.display = 'none'
    portfolio_edit.style.display = 'none'
    page_edition.style.display = 'none'

  })
}
function effaceEdition(){
  zoneEdition.style.display = "none";
}
function clean(zone) {

  zone.innerHTML = ""
}
function getGalleryEdit() {
  zone_images = document.querySelector(".gallery-edit");
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      renderWorksEdit(data)
      affichage_ajout()
    })
    .catch(error => console.error(error))

}
function affichage_ajout() {
  bouton_ajout = document.querySelector(".bouton-ajout")
  bouton_ajout.addEventListener('click', function () {
    ajout_photo.style.display = 'flex'
    portfolio_edit.style.display = "none"
  })
  getCategory().then(
    data => renderCategoryList(data));
  bouton_validé = document.querySelector(".bouton-validé")
  bouton_validé.addEventListener('click', function () {recupImg()})
}
function recupImg() {
  // Récupérer le fichier image à partir de la zone d'import
  const imageInput = document.getElementById('image-input');
  const imageFile = imageInput.files[0];

  // Créer un objet FormData pour inclure le fichier dans la requête
  const formData = new FormData();
  formData.append('image', imageFile);
  
  // Ajouter les autres champs du formulaire à FormData
  const titre = document.querySelector('#titre-image').value;
  const imageType = document.querySelector('#category').value;
  formData.append('title', titre);
  formData.append('category', imageType);

  console.log(formData);

  workPost(formData);
}
function workPost(formData) {
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
}
function removeImage(boutonDel) {

  let image =  boutonDel.parentNode
  let galery=image.parentNode
  var index = Array.prototype.indexOf.call(galery.children, image);
  getWorks().then(
    data =>workDel(data[index]["id"]));
}
function workDel(index) {
  fetch('http://localhost:5678/api/works/'+index, {
    method: 'DELETE',
    headers: {
      'Accept': '*/*',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    }
  })
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));
}

init()
authorize() 