const images = [
  "/assets/carousel-img/item-2.jpeg",
  "/assets/carousel-img/item-1.jpeg",
  "/assets/carousel-img/item-3.jpeg",
  "/assets/carousel-img/item-4.jpeg",
  "/assets/carousel-img/item-5.jpeg",
];

let currentCount = 0;

let firstElement = document.getElementsByClassName(
  "discover-illustration-images__item-1"
)[0];
let secondElement = document.getElementsByClassName(
  "discover-illustration-images__item-2"
)[0];

export function initSwiper() {
  move(0);
}

function move(index) {
  let currentIndex = index;
  let nextIndex = index + 1;

  if (index < 0) {
    currentIndex = images.length - 1;
    nextIndex = 0;
    index = images.length - 1;
  }

  if (index === images.length - 1) nextIndex = 0;

  if (index === images.length) {
    currentIndex = 0;
    nextIndex = 1;
    index = 0;
  }

  firstElement.getElementsByTagName("img")[0].src = images[currentIndex];
  firstElement.style.setProperty("--img-src", `url(${images[currentIndex]})`);
  secondElement.getElementsByTagName("img")[0].src = images[nextIndex];
  secondElement.style.setProperty("--img-src", `url(${images[nextIndex]})`);

  currentCount = index;
  transform("");
}

function transform(type) {
  if (type === "dis") {
    firstElement.getElementsByTagName("img")[0].style.transform = "scale(0, 0)";
    firstElement.style.setProperty("--scale", "scale(0, 0)");
    secondElement.getElementsByTagName("img")[0].style.transform =
      "scale(0, 0)";
    secondElement.style.setProperty("--scale", "scale(0, 0)");
  } else {
    firstElement.getElementsByTagName("img")[0].style.transform = "scale(1, 1)";
    firstElement.style.setProperty("--scale", "scale(1, 1)");
    secondElement.getElementsByTagName("img")[0].style.transform =
      "scale(1, 1)";
    secondElement.style.setProperty("--scale", "scale(1, 1)");
  }
}

export function swiperPrev() {
  transform("dis");
  setTimeout(() => move(--currentCount), 500);
}

export function swiperNext() {
  transform("dis");
  setTimeout(() => move(++currentCount), 500);
}
