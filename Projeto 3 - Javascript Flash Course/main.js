
// Previsão do tempo
// APIKEY e APIURL pego do site "openweathermap.org"
const weatherAPIKey = "792778c1e6439ccef07894e54441a823"
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`

// Array de objetos
const galerryImages = [
    {
        src: "./assets/gallery/image1.jpg", 
        alt: "Thumbnail Image 1"    
    },
    {
        src: "./assets/gallery/image2.jpg", 
        alt: "Thumbnail Image 2"    
    },
    {
        src: "./assets/gallery/image3.jpg", 
        alt: "Thumbnail Image 3"    
    }
];

// Array dos produtos
const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ]

// Menu Section 
function menuHandler(){
        // FORMA ADICIONANDO E REMOVENDO UMA CLASSE 
        document.querySelector("#open-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
        });
        
        document.querySelector("#close-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
        
        });
}

// Calculo converter 
function celsiusToFar(temperature){
    let fahr = (temperature * (9/5) + 32);
    return fahr;
}

//Greeting Section 
function greetingHandler(){
    // Good Morning, Afternoon, Evening.
    let correntHour = new Date().getHours();
    let greetingText = "";

    if(correntHour < 12){
        greetingText = "Good Morning!"
    }else if(correntHour < 18){
        greetingText = "Good Afternoon!"
    }else if(correntHour < 24){
        greetingText = "Good Evening!"
    }else{
        greetingText = "Welcome!"
    }

    document.querySelector("#greeting").innerHTML = greetingText;

}

// Weather Section 
function weatherHandler(){
    navigator.geolocation.getCurrentPosition(position =>{
        
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = weatherAPIURL
            .replace("{lat}", latitude)
            .replace("{lon}", longitude)
            .replace("{API key}", weatherAPIKey);
    
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const condition = data.weather[0].description;
            const location = data.name;
            let temperature = data.main.temp;
    
            let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}°C outside.`
            let farhText = `The weather is ${condition} in ${location} and it's ${celsiusToFar(temperature).toFixed(1)}°F outside.`
            
            document.querySelector("p#weather").innerHTML = celsiusText; 
    
            document.querySelector(".weather-group").addEventListener("click", function(evt){
            
            if(evt.target.id == "fahr"){
                document.querySelector("p#weather").innerHTML = farhText;
            }else if(evt.target.id == "celsius"){
                document.querySelector("p#weather").innerHTML = celsiusText;
            }
        })   
            
        }).catch((err => {
            document.querySelector("p#weather").innerHTML = "Unable to get the weather info. Try again latter."
        }))
    });       
}

// Clock Section
function clockHandler(){
    setInterval(function(){
        let localTime = new Date();
    
    document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
    document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
    document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");
    },1000);
}

// Galerry Section 
function galleryHandle(){
    let mainImage = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");

    // IMAGEM DO FUNDO 
    mainImage.src = galerryImages[0].src;
    mainImage.alt = galerryImages[0].alt;

    // CRIAÇÃO DO ARRAY DE IMAGENS 
    galerryImages.forEach(function(image, index){
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;
        
        // FUNÇÃO CLICK PARA MUDAR A IMAGEM
        thumb.addEventListener("click", function(e){
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImages = galerryImages[selectedIndex];
            mainImage.src = selectedImages.src;
            mainImage.alt = selectedImages.alt;   

            thumbnails.querySelectorAll("img").forEach(function(img){
                img.dataset.selected = false;
            })

            e.target.dataset.selected = true;
        })

        thumbnails.appendChild(thumb);
    
})
}

// Products Section 
function populateProducts(productList){
            let productsSection = document.querySelector(".products-area");
            productsSection.textContent = "";

            // Correr um looping através dos produtos e criar um HTML para cada um. 
            productList.forEach(function(product, index){
            // Cria uma div
            let productElm = document.createElement("div");
            productElm.classList.add("product-item");
    
            // Cria a imagem
            let productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = "Image for" + product.title;
    
            // Criar os detalhes da seção produtos
            let productDetails = document.createElement("div");
            productDetails.classList.add("product-details")
    
            // Criando títulos, autor e preços
            let productTitle = document.createElement("h3");
            productTitle.classList.add("product-title");
            productTitle.textContent = product.title;
    
            let productAuthor = document.createElement("p");
            productAuthor.classList.add("product-author");
            productAuthor.textContent = product.title;
    
            let priceTitle = document.createElement("p");
            priceTitle.classList.add("price-title");
            priceTitle.textContent = "Price"
    
            let prudctPrice = document.createElement("p");
            prudctPrice.classList.add("product-price");
            prudctPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";
    
            // Adicionar os detalhes do produto ao elemento "Product Details"
            productDetails.append(productTitle);
            productDetails.append(productAuthor);
            productDetails.append(priceTitle);
            productDetails.append(prudctPrice);
    
            // Adiciona os filhos (imagem) dentro da div
            productElm.append(productImage);
            productElm.append(productDetails);
    
            // Adiciona o produto individual a seção de produtos.
            productsSection.append(productElm);
        })
}

// Products Section (All, Paid, Free)
function producthandler(){


    let freeProducts = products.filter(item => !item.price || item.price <= 0);
    let paidProducts = products.filter(item => item.price > 0);

    populateProducts(products);

    // Filtro de imagens (todas, pagas, gratis)
    let totalProducts = products.length;
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;

    let productsFilter = document.querySelector(".products-filter")
    productsFilter.addEventListener("click", function(e){
        if(e.target.id === "all"){
            populateProducts(products);
        }else if(e.target.id === "paid"){
            populateProducts(paidProducts);
        }else if(e.target.id === "free"){
            populateProducts(freeProducts);
        }
    })
}

// Footer Section 
function footerHandler(){
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `© ${currentYear} - All rights reserved`;
}





// Page Load
menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandle();
producthandler();
footerHandler();
