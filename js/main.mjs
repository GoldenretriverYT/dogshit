import * as bootstrap from "bootstrap";

var imageCache = [];
var carouselContentEl, carouselEl, carousel;

window.addEventListener("load", () => {
    carouselContentEl = document.getElementById("dogCarousel-inner");
    carouselEl = document.getElementById("dogCarousel");
    carousel = new bootstrap.Carousel(carouselEl);

    carouselEl.addEventListener("slide.bs.carousel", () => {
        addNewImage();
    });

    addNewImage();
    addNewImage();

    setInterval(showNextImage, 10);
});

async function showNextImage() {
    carousel.next();
}

async function addNewImage() {
    if(imageCache.length < 1) {
        await loadNewImages();
    } 

    var nextImage = imageCache.pop();

    var div = document.createElement("div");
    div.classList.add("carousel-item");

    var img = document.createElement("img");
    img.src = nextImage;
    img.classList.add("d-block", "w-100");

    div.appendChild(img);
    carouselContentEl.appendChild(div);
}

async function loadNewImages() {
    var fRes = await (fetch("https://dog.ceo/api/breeds/image/random/50").catch((err) => alert(err)));
    var json = await fRes.json();

    if(json.status != "success") {
        return;
    }

    imageCache = json.message;
}