let zone_images = document.querySelector(".gallery");
const bouton_Hotel = document.querySelector(".bouton_Hotel");
const bouton_Appartements = document.querySelector(".bouton_Appartements");
const bouton_Objets = document.querySelector(".bouton_Objets");
const bouton_Tous = document.querySelector(".bouton_Tous");
const bouton_edition = document.querySelector('.bouton-edition')
const page_edition = document.querySelector('#page_edition')
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
    console.log('tableau',tableau_trié)
    renderWorks(tableau_trié)
  }


}
function reset(type) {
  zone_images.innerHTML = "";
  getWorks().then(
    data=> tri(data, type));
  
    
  

}

function renderWorks(works) {
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
    let div=document.createElement("div")
    img.src = projet.imageUrl;
    img.crossOrigin = "anonymous";
    figcap.innerHTML = 'editer';


    div.appendChild(img);
    zone_images.appendChild(div)  
    div.appendChild(figcap);
  });
}

/**
 * Restitution des traveaux à partir de l'API
 * @returns 
 */
function getWorks() {
  return fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      console.log("data array",data);
      return data
    })
    .catch(error => console.error(error));
}
function init() {
    getWorks().then(
      data=> renderWorks(data));
}
function authorize() {
  let token = sessionStorage.getItem('token');
  console.log(token)
  if (token == null) {   
    console.log( 'le token n existe pas')
     } 
  else {affichage_edition()
  
  }

}
function affichage_edition(){
  const zoneEdition=document.querySelector('#zone-mode-edition')
  zoneEdition.style.display = "flex";
  bouton_edition.addEventListener("click", function () { page_edition.style.display = "flex"; 
  const portfolio_edit=document.querySelector('.portfolio_edit')
  portfolio_edit.style.display = "flex"
  affihageGaleryEdit()
});
page_edition.addEventListener('click',function(){
  page_edition.style.display='none'
clean(zone_images)
})
const bouton_ajout = document.querySelector(".bouton-ajout")
  bouton_ajout.addEventListener('click',function(){affichage_ajout()})
  
}
function clean(zone){
console.log('zone',zone)
 zone.innerHTML = ""}
  
function affihageGaleryEdit(){
  zone_images = document.querySelector(".gallery-edit");
 
  fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {renderWorksEdit(data)})
  .catch(error => console.error(error))
}
function affichage_ajout(){
  page_ajout=document.querySelector("#page_ajout");
  page_ajout.style.display = "flex";
}
init()
authorize() 
