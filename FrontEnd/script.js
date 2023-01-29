const zone_images = document.getElementById("gallery");
let figure=document.createElement("figure")
let img = document.createElement("img");
let figcap=document.createElement("figcaption")
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {let data_url =[];
        for (let url in data) {
            data_url.push(data[url]["imageUrl"]);} 
        console.log(data_url); 

        for(let i=0; i< data_url.length; i++){
            img.src = data_url[i];
            figure.appendChild(img)
            figure.appendChild(figcap)
            zone_images.appendChild(figure);}
          })


