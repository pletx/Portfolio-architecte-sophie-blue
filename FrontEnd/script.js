const zone_images = document.querySelector(".gallery");
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
    affihage_img(data)
    
    console.log(data);
    })
    .catch(error => console.error(error))

    function recuperation(data,nom_clé) {
        let tableau = [];
        for (let donnée in data) {
            tableau.push(data[donnée][nom_clé]);
        }
        return tableau
      }
    function affihage_img(data){
        let data_url=recuperation(data,"imageUrl")
        for (let i = 0; i < data_url.length; i++) {
        let img = document.createElement("img");
        let figure = document.createElement("figure")
        let figcap = document.createElement("figcaption")
        img.src = data_url[i];
        img.crossOrigin="anonymous"
        figure.appendChild(img)
        figure.appendChild(figcap)
        zone_images.appendChild(figure);
        figcap.innerHTML=recuperation(data,"title")[i]
       
    }
    }
