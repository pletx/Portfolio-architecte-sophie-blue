const zone_images = document.querySelector(".gallery");

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const bouton_Hotel = document.querySelector(".bouton_Hotel");
    const bouton_Appartements = document.querySelector(".bouton_Appartements");
    const bouton_Objets = document.querySelector(".bouton_Objets");
    const bouton_Tous = document.querySelector(".bouton_Tous");
    console.log(bouton_Tous.textContent)
    affihage_img(data)
    bouton_Tous.addEventListener("click", function() {reset(data, bouton_Tous.textContent)});
    bouton_Objets.addEventListener("click", function() {reset(data, bouton_Objets.textContent)});
    bouton_Appartements.addEventListener("click", function() {reset(data, bouton_Appartements.textContent)});
    bouton_Hotel.addEventListener("click", function() {reset(data, bouton_Hotel.textContent)});
  })
  .catch(error => console.error(error));

function recuperation(data, nom_clé){
        let tableau = [];
        for (let donnée in data) {
            tableau.push(data[donnée][nom_clé]);
        }
        return tableau
      }
function affihage_img(image){
        console.log("image",image)
        let image_url=recuperation(image,"imageUrl")
        for (let i = 0; i < image_url.length; i++) {
        let img = document.createElement("img");
        let figure = document.createElement("figure")
        let figcap = document.createElement("figcaption")
        img.src = image_url[i];
        img.crossOrigin="anonymous"
        figure.appendChild(img)
        figure.appendChild(figcap)
        zone_images.appendChild(figure);
        figcap.innerHTML=recuperation(image,"title")[i]
       
    }
    }
function tri(data,type){
    let tableau_trié=[]
    console.log(type)
    if(type=='Tous'){affihage_img(data)}

    else{
    for (let travaux in data) {
        if(data[travaux]['category']['name']==type){
            tableau_trié.push(data[travaux]);
        }
        
    }affihage_img(tableau_trié)}
 
    
  }
function reset(data,type)
{
    
    zone_images.innerHTML = "";
    tri(data,type)
    
}




