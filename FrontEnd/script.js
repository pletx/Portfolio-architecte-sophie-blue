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
const titreImage = document.querySelector('#titre-image')
const bouton_login = document.querySelector(".bouton-login")
const category = document.querySelector('#category')
const boutonValidé = document.querySelector(".bouton-validé")
const zoneDepot = document.querySelector(".zone-depot")
const imageInput = document.querySelector('#image-input')
const preview = document.querySelector("#preview");
const titreAjoutPhoto = document.querySelector(".titre-ajout-photo")

bouton_login.addEventListener('click', function () { loginCheck() })
bouton_Tous.addEventListener("click", function () { reset(bouton_Tous.textContent) });
bouton_Objets.addEventListener("click", function () { reset(bouton_Objets.textContent) });
bouton_Appartements.addEventListener("click", function () { reset(bouton_Appartements.textContent) });
bouton_Hotel.addEventListener("click", function () { reset(bouton_Hotel.textContent) });
boutonValidé.addEventListener('click', function () {
  if (boutonValidé.value == "Valider") {
    recupImg()
   
  }

})

function checkPresence(array, element) {

  return array.includes(element);
}

function tri(data, type) {
  let tableau_trié = []
  let tableauTitre = []
  if (type == 'Tous') {
    for (let travaux in data) {
      if (checkPresence(tableauTitre, data[travaux]['title']) == false) {
        tableau_trié.push(data[travaux]);
        tableauTitre.push(data[travaux]['title'])
      }
    }
  }
  else {
    for (let travaux in data) {
      console.log("..................", type, data[travaux]['category']['name'])
      if (data[travaux]['category']['name'] == type) {
        if (checkPresence(tableauTitre, data[travaux]['title']) == false) {
          tableau_trié.push(data[travaux]);
          tableauTitre.push(data[travaux]['title'])
        }
        if (checkPresence(tableauTitre, data[travaux]['title']) == true) {
          workDel(data[travaux]['category']['id'])
        }
      }
    }
    console.log('tableau trié', tableau_trié)
  }
  return tableau_trié

}
function reset(type) {
  console.log('reset')
  zone_images = document.querySelector(".gallery");
  zone_images.innerHTML = "";
  getWorks().then(
    data => renderWorks(tri(data, type)));
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
    boutonDel.addEventListener('click', function () { removeImage(boutonDel) })
    img.src = projet.imageUrl;
    img.crossOrigin = "anonymous";
    figcap.innerHTML = 'éditer';
    figcap.addEventListener('click', function () { editImage(figcap) })
    zone_images.appendChild(imgGallery)
    imgGallery.appendChild(img);
    imgGallery.appendChild(figcap);
    imgGallery.appendChild(boutonDel)



  });
}
function loginCheck() {
  console.log(bouton_login.textContent)
  if (bouton_login.textContent == 'login') {

    window.location.href = "./page_login.html"
  }

  else {
    logout()
    effaceEdition()
    bouton_login.textContent = 'login'
  }

}
function logout() {
  localStorage.removeItem('token')
}
function renderCategoryList(categoryList) {
  console.log('categoryList', categoryList)

  categoryList.forEach(type => {
    console.log('type', type)
    let option = document.createElement('option')
    option.value = type['id']
    option.textContent = type['name']
    category.appendChild(option)
  });
}

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
    data => renderWorks(tri(data, 'Tous')));
}
/**
 * Verification de la presence d'un token
 */
function authorize() {
  let token = localStorage.getItem('token');
  let trueToken = localStorage.getItem('trueToken')
  console.log(token, trueToken)
  if (token == null) {
    console.log('le token n existe pas')
    effaceEdition()
  }
  if (token == 'undefined') {
    console.log('le token n existe pas')
    effaceEdition()
  }
  if (token == trueToken) {
    if (trueToken != null) {
      bouton_login.textContent = 'logout'
      affichageBarreEdition()
    }
  }
}
function affichageBarreEdition() {
  zoneEdition.style.display = "flex";
  bouton_edition.addEventListener("click", function () {
    page_edition.style.display = "flex";
    portfolio_edit.style.display = "flex"
    ajout_photo.style.display = 'none'
    clean()
    getGalleryEdit()
  });
  page_edition.addEventListener('click', function () {
    close()
  })
}
function close() {
  ajout_photo.style.display = 'none'

  portfolio_edit.style.display = 'none'
  page_edition.style.display = 'none'

}
function effaceEdition() {
  zoneEdition.style.display = "none";
}
function clean() {
  zone_images = document.querySelector(".gallery-edit");
  zone_images.innerHTML = ""
}
function getGalleryEdit() {
  zone_images = document.querySelector(".gallery-edit");
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      renderWorksEdit(tri(data, 'Tous'))
      affichageAjout()
    })
    .catch(error => console.error(error))

}
function affichageAjout() {
  
  bouton_ajout = document.querySelector(".bouton-ajout")
  boutonValidé.value = 'Valider'
  titreAjoutPhoto.textContent = 'Ajout photo'
  bouton_ajout.addEventListener('click', function () {
    ajout_photo.style.display = 'flex'
    portfolio_edit.style.display = "none"
    preview.src=''
    titreImage.value = ''
    category.value = ''
    imageInput.value = ''

  })

}
function affichageAjoutModif(work) {
  console.log(imageInput.files[0])
  preview.src=''
  titreAjoutPhoto.textContent = work['title']
  ajout_photo.style.display = 'flex'
  boutonValidé.value = 'Modifié'
  portfolio_edit.style.display = "none"
  titreImage.value = work['title']
  category.value = work['category']['id']
  imageInput.value = ''

  boutonValidé.addEventListener('click', function () { workEdit(work) })

}

function changePreviewImage() {
  console.log('file', imageInput.files[0])
  preview.src = "./assets/images/" + imageInput.files[0]['name']
}
function recupImg() {
  // Récupérer le fichier image à partir de la zone d'import;
  const imageFile = imageInput.files[0];

  // Créer un objet FormData pour inclure le fichier dans la requête
  const formData = new FormData();
  formData.append('image', imageFile);

  // Ajouter les autres champs du formulaire à FormData
  const titre = document.querySelector('#titre-image').value;
  const imageType = document.querySelector('#category').value;
  formData.append('title', titre);
  formData.append('category', imageType);
  console.log("Imagefile",imageFile);
  if(imageFile == undefined){
    alert('Entrez une image')
  }
  if (titre == '') {
    alert('Entrez un titre')
  }
  if (category == '') {
    alert('Selectionnez un catergorie')
  }
  

  else{
    if (titre != ''){
   if (category != '') {
    if(imageFile !=undefined){
    console.log('envoie')
    workPost(formData);
     close()
    reset('Tous')}}}}
 


}
async function workPost(formData) {
  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: formData
    });
    const data = await response.json();
    console.log(data);
    reset('Tous'); // appel à la fonction reset après l'ajout du nouveau travail
  } catch (error) {
    console.error(error);
  }
}
function removeImage(boutonDel) {
  let image = boutonDel.parentNode
  let galery = image.parentNode
  var index = Array.prototype.indexOf.call(galery.children, image);
  getWorks().then(
    data => workDel(data[index]["id"]));
  close()
  reset('Tous')
}
function editImage(figcap) {
  let image = figcap.offsetParent
  let galery = image.parentNode
  console.log(image.firstChild)
  let index = Array.prototype.indexOf.call(galery.children, image);
  getWorks().then(
    data => affichageAjoutModif(data[index]));


}
function workEdit(work) {
  boutonValidé.removeEventListener('click', function () { workEdit(work) })  
recupImg()
 workDel(work['id'])
}
async function workDel(index) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${index}`, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

init()
authorize()
getCategory().then(
  data => renderCategoryList(data));
