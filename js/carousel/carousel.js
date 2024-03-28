"use strict";

let carousel = document.getElementsByClassName("carousel")[0];
let slider = carousel.getElementsByClassName("carousel__slider")[0];
let items = carousel.getElementsByClassName("carousel__slider_item");

export const nftSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11.3756 1.63513L5.86191 10.8982L11.3756 14.2064L16.8894 10.8982L11.3756 1.63513ZM5.86191 12.0009L11.3756 19.7201L16.8894 12.0009L11.3756 15.3092L5.86191 12.0009Z" fill="#141416"/>
  </svg>
`;

let width,
  height,
  totalWidth,
  margin = 20,
  currIndex = 0,
  interval,
  intervalTime = 4000;

export function initCarousel() {
  resize();
  move(Math.floor(items.length / 2));
  bindEvents();
  getCarouselCards();

  timer();
}

function resize() {
  (width = Math.max(window.innerWidth * 0.25, 275)),
    (height = window.innerHeight * 0.5),
    (totalWidth = width * items.length);

  slider.style.width = totalWidth + "px";
}

function move(index) {
  if (index < 1) index = items.length;
  if (index > items.length) index = 1;

  currIndex = index;
  slider.style.transform =
    "translate3d(" +
    (index * -width + width / 2 + window.innerWidth / 2) +
    "px, 0, 0)";
}

function timer() {
  clearInterval(interval);
  interval = setInterval(() => {
    move(++currIndex);
  }, intervalTime);
}

export function carouselPrev() {
  move(--currIndex);
  timer();
}

export function carouselNext() {
  move(++currIndex);
  timer();
}

function bindEvents() {
  window.onresize = resize;
}

async function getCarouselCards() {
  let response = await fetch("/js/carousel/cards.json");

  if (response.ok) {
    let json = await response.json();

    json.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList = "carousel__slider_item";
      card.id = "carousel-card-" + index;

      const content = `
        <section class="nft-card">
            <div class="nft-card__img">
                <img src=${item.imgSrc} />
                <div class="nft-card__time-pin">
                    <p>${item.time}</p>
                </div>
            </div>
            <h6>${item.title}</h6>
            <div class="nft-card__content">
                <div class="nft-card__description">
                    <p class="p-bid">${item.description}</p>
                    <div class="nft-card__price">
                        ${nftSvg}
                        <p>${item.price}</p>
                    </div>
                </div>
                <button class="button button-dark">PLACE BID</button>
            </div>
        </section>
      `;

      card.innerHTML = content;

      slider.appendChild(card);
    });
  }
}
