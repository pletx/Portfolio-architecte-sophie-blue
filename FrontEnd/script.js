let zoneImages = document.querySelector(".gallery");
const boutonTous = document.querySelector(".bouton-Tous");
const boutonEdition = document.querySelectorAll('.bouton-edition')
const pageEdition = document.querySelector('#page-edition')
const ajoutPhoto = document.querySelector('.ajout-photo')
const zoneEdition = document.querySelector('#zone-mode-edition')
const portfolioEdit = document.querySelector('.portfolio-edit')
const titreImage = document.querySelector('#titre-image')
const boutonLogin = document.querySelector(".bouton-login")
const category = document.querySelector('#category')
const boutonValidé = document.querySelector(".bouton-validé")
const zoneDepot = document.querySelector(".zone-depot")
const body = document.querySelector('body')
const imageInput = document.querySelector('#image-input')
const preview = document.querySelector("#preview");
const titreAjoutPhoto = document.querySelector(".titre-ajout-photo")
const filter = document.querySelector(".filter")
const modale = document.querySelector('#modale')
const inputZone = document.querySelector(".input-zone")
const arrow = document.querySelectorAll('.fa-arrow-left')
boutonAjout = document.querySelector(".bouton-ajout")
let boutonValideEventListener = 0
console.log(arrow)
arrow[0].addEventListener('click', function () {
  ajoutPhoto.style.display = 'none'
  titreAjoutPhoto.textContent = 'Ajouter photo'
  portfolioEdit.style.display = "flex"
})
const xmarks = document.querySelectorAll('.fa-xmark')


xmarks.forEach(xmark => {
  xmark.addEventListener('click', function () { close() })
})

boutonLogin.addEventListener('click', function () { loginCheck() })

function butttonCreate() {
  getCategory().then(
    data => {
      data.forEach(category => {
        let bouton = document.createElement('div')
        bouton.className = 'bouton_tri bouton-' + category['name'];
        bouton.textContent = category['name']
        filter.appendChild(bouton)

        
        bouton.addEventListener("click", function () { 
        bouton_tri=document.querySelectorAll('.bouton_tri')
        bouton_tri.forEach(tri =>{
          tri.style.backgroundColor='white',
          tri.style.color='#1D6154'
         } )
        bouton.style.color='rgb(255, 255, 255)'
	      bouton.style.backgroundColor='#1D6154'
          reset(bouton.textContent) })

      });
    })
  boutonAjout.addEventListener('click', function () {
    modale.style.display = "flex"
    ajoutPhoto.style.display = 'flex'
    portfolioEdit.style.display = "none"
    preview.src = "./assets/icons/image-import.png"
    inputZone.style.display = 'flex'
    preview.style.marginTop = '26px'
    preview.style.height = '46px'
    preview.style.opacity = '0.5'
    titreImage.value = ''
    category.value = ''
    imageInput.value = ''
  })
  boutonValidé.addEventListener('click', function () {
    if (boutonValidé.value == "Valider") {
      recupImg()
    }
  })
  boutonTous.addEventListener('click', function () { 
    bouton_tri.forEach(tri =>{
      tri.style.backgroundColor='white',
      tri.style.color='#1D6154'
     } )
     boutonTous.style.color='rgb(255, 255, 255)'
     boutonTous.style.backgroundColor='#1D6154'
    reset('Tous') })
}


function checkPresence(array, element) {
  return array.includes(element);
}

function tri(data, type) {
  let tableauTrié = []
  let tableauTitre = []
  if (type == 'Tous') {
    for (let travaux in data) {
      tableauTrié.push(data[travaux]);
    }
  }
  else {
    for (let travaux in data) {
      console.log(type, data[travaux]['category']['name'])
      if (data[travaux]['category']['name'] == type) {
        tableauTrié.push(data[travaux]);
      }
    }
    console.log('tableau trié', tableauTrié)
  }
  return tableauTrié

}
function reset(type) {
  console.log('reset')
  zoneImages = document.querySelector(".gallery");
  zoneImages.innerHTML = "";
  getWorks().then(
    data => renderWorks(tri(data, type)));
}
function renderWorks(works) {
  zoneImages = document.querySelector(".gallery");
  works.forEach(projet => {
    let img = document.createElement("img");
    let figure = document.createElement("figure")
    let figcap = document.createElement("figcaption")
    img.src = projet.imageUrl;
    img.crossOrigin = "anonymous";
    figure.appendChild(img)
    figcap.innerHTML = projet.title
    figure.appendChild(figcap)
    zoneImages.appendChild(figure);
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
    boutonDel.addEventListener('click', function () {
      removeImage(boutonDel)
    })
    icon = document.createElement('i')
    icon.className = "fa-solid fa-trash-can"
    icon.style.color = 'white'
    boutonDel.appendChild(icon)
    img.src = projet.imageUrl;
    img.crossOrigin = "anonymous";
    figcap.innerHTML = 'éditer';
    figcap.addEventListener('click', function () { editImage(figcap) })
    zoneImages.appendChild(imgGallery)
    imgGallery.appendChild(img);
    imgGallery.appendChild(figcap);
    imgGallery.appendChild(boutonDel)
    imgGallery.dataset.id = projet['id']



  });
}
function loginCheck() {
  console.log(boutonLogin.textContent)
  if (boutonLogin.textContent == 'login') {

    window.location.href = "./page_login.html"
  }

  else {
    logout()
    effaceEdition()
    boutonLogin.textContent = 'login'
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
      boutonLogin.textContent = 'logout'
      affichageBarreEdition()
    }
  }
}
function affichageBarreEdition() {
  zoneEdition.style.display = "flex";

  body.style.marginTop = "98px"
  boutonEdition.forEach(bouton => {
    bouton.addEventListener("click", function () {
      pageEdition.style.display = "flex";
      modale.style.display = "flex"
      portfolioEdit.style.display = "flex"
      ajoutPhoto.style.display = 'none'
      clean()
      getGalleryEdit()
    });
  })

  pageEdition.addEventListener('click', function () {
    close()
  })
}
function close() {
  modale.style.display = "none"
  pageEdition.style.display = 'none'

}
function effaceEdition() {
  boutonEdition.forEach(bouton => bouton.style.display = 'none')

  zoneEdition.style.display = "none";
  body.style.marginTop = "auto"
}
function clean() {
  zoneImages = document.querySelector(".gallery-edit");
  zoneImages.innerHTML = ""
}
function getGalleryEdit() {
  zoneImages = document.querySelector(".gallery-edit");
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      renderWorksEdit(tri(data, 'Tous'))
      affichageAjout()
    })
    .catch(error => console.error(error))

}
function affichageAjout() {

  boutonValidé.value = 'Valider'
  titreAjoutPhoto.textContent = 'Ajout photo'


}
function affichageAjoutModif(work) {
  console.log(work)
  preview.src = "./assets/icons/image-import.png"
  inputZone.style.display = 'flex'
  preview.style.marginTop = '26px'
  preview.style.height = '46px'
  preview.style.opacity = '0.5'
  titreAjoutPhoto.textContent = work['title']
  ajoutPhoto.style.display = 'flex'
  boutonValidé.value = 'Modifié'
  portfolioEdit.style.display = "none"
  titreImage.value = work['title']
  category.value = work['category']['id']
  imageInput.value = ''
  const boutonValidéClickHandler = function () {
    console.log(boutonValidé);
    workEdit(work);
  }
console.log(boutonValideEventListener)
  if (boutonValideEventListener < 1) {
    boutonValidé.addEventListener('click', boutonValidéClickHandler);
  }
  boutonValideEventListener += 1
}

function changePreviewImage() {
  console.log('file', imageInput.files[0])
  const parts = imageInput.files[0]['name'].split(".");
  const extension = parts[parts.length - 1];
if (extension !== "jpg" && extension !== "png") {
  alert("Erreur: extension de fichier invalide");
}
else{
  preview.src = "./assets/images/" + imageInput.files[0]['name']
  inputZone.style.display = 'none'
  preview.style.marginTop = 0
  preview.style.height = '162px'
  preview.style.opacity = '1'
}}
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
  console.log("Imagefile", imageFile);

  if (imageFile == undefined) {
    alert('Entrez une image')
  }
  if (titre == '') {
    alert('Entrez un titre')
  }
  if (category.value == '') {
    alert('Selectionnez un catergorie')
  }
  else {
    if (titre != '') {
      if (category != '') {
        if (imageFile != undefined) {
          console.log('envoie')
          workPost(formData);
          close()
        }
      }
    }
  }



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
  let image = boutonDel.offsetParent
  var index = image.dataset.id
  workDel(index);
  close()
}
function editImage(figcap) {
  let image = figcap.offsetParent
  let galery = image.parentNode

  let index = Array.prototype.indexOf.call(galery.children, image);
  console.log(index)
  getWorks().then(
    data => affichageAjoutModif(data[index]));


}
function workEdit(work) {
  recupImg()
  workDel(work['id'])
  reset('Tous')

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
    reset('Tous')
  } catch (error) {
    console.error(error);
  }
}

init()
authorize()
getCategory().then(
  data => renderCategoryList(data));
butttonCreate()
