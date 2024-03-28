"use strict";

import { nftSvg } from "../carousel/carousel.js";

export async function getViewers() {
  const viewersContainer =
    document.getElementsByClassName("viewers__content")[0];

  let response = await fetch("/js/viewers/cards.json");

  if (response.ok) {
    let json = await response.json();
    console.log(json);
    json.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList = "viewers__content_item";
      card.id = "viewers-card-" + index;

      const isPercentageAbove = item.percent.includes("-");

      const content = `
        <div class="viewers-item__info">
            <div class="viewers-item__avatar">
                <img src=${item.avatar} />
                <div class="viewers-avatar__pin">
                    <p>${item.nftCount}</p>
                </div>
            </div>
            <div class="viewers-item__contact">
                <p class="p-middle">${item.fio}</p>
                <p class="p-small">${item.nick}</p>
            </div>
        </div>
        <div class="viewers-item__wallets">
            <div class="nft-card__price">
                ${nftSvg}
                <p class="p-middle">${item.wallets}</p>
            </div>
            <p class="p-bid ${isPercentageAbove ? "text-red" : "text-green"}">${
        item.percent
      }%</p>
        </div> 
      `;

      card.innerHTML = content;

      viewersContainer.appendChild(card);
    });
  }
}
