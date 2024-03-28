"use strict";

import {
  initCarousel,
  carouselNext,
  carouselPrev,
} from "./carousel/carousel.js";
import { getViewers } from "./viewers/viewers.js";
import { initSwiper, swiperNext, swiperPrev } from "./swiper/swiper.js";

window.carouselNext = carouselNext;
window.carouselPrev = carouselPrev;
window.swiperNext = swiperNext;
window.swiperPrev = swiperPrev;

function onWindowLoad() {
  initSwiper();
  initCarousel();
  getViewers();
}

document.addEventListener("DOMContentLoaded", onWindowLoad);
