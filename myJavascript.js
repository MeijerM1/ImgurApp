

function sayHello() {
    console.log("Hello from the javascript file!");
}

function search() {
    var query = document.getElementById("searchBar").value;
    console.log("Searching for: " + query);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {            
            showResults(xhttp.responseText);
        }
    };
    xhttp.open("GET", "https://api.imgur.com/3/gallery/search/top/0.json?q=" + query , true);
    xhttp.setRequestHeader('Authorization', 'Client-ID ' +  clientId);
    xhttp.send();
}

function showResults(response){
    var jsonResponse = JSON.parse(response);
    console.log(jsonResponse);
    jsonResponse.data.forEach(gallery => {
        createGallery(gallery);
    });
}

function createImage(url) {
    var img = document.createElement("img")
    
    img.setAttribute("src", url);
    img.setAttribute("width", 300);
    img.setAttribute("height", 300);

    return img;
}

function createGallery(gallery) {
    console.log(gallery);
    var galleryDiv = document.createElement("div");

    var title = document.createElement("h3");
    title.innerHTML = gallery.title;
    galleryDiv.appendChild(title);

    if(gallery.images) {
        gallery.images.forEach(image => {          
            galleryDiv.appendChild(createImage(image.link));
        })                    
    } else {
        galleryDiv.appendChild(createImage(gallery.link));
    }

    galleryDiv.style.backgroundColor = "grey";
    galleryDiv.style.border = "10px";
    galleryDiv.style.borderStyle = "solid";

    document.getElementById("results").appendChild(galleryDiv);
}