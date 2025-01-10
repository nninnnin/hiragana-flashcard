import { sample } from "lodash";
import { inject } from "@vercel/analytics";

import { hiraganas } from "./constants/hiragana";
import { katakanas } from "./constants/katakana";
import { convertAlphabet } from "./converter";

const getJPAlphabet = () => {
  return location.pathname.includes("katakana") ? katakanas : hiraganas;
};

const pickRandom = (alphas) => {
  const randomRow = sample(alphas.meta.rowLabels);
  const randomColumn = sample(alphas.meta.columnLabels);

  const alphbet =
    alphas.table[alphas.meta.columnLabels.indexOf(randomColumn)][
      alphas.meta.rowLabels.indexOf(randomRow)
    ];

  if (!alphbet) {
    return pickRandom(alphas);
  }

  return { randomRow, randomColumn, alphbet };
};

const main = () => {
  const container = document.querySelector(".container");
  const contentsWrapper = document.querySelector(".container > h1");

  container.addEventListener("click", () => {
    // pick random row and column
    const { randomRow, randomColumn, alphbet } = pickRandom(getJPAlphabet());

    const combiAlpha = convertAlphabet(`${randomColumn}${randomRow}`);

    contentsWrapper.innerHTML = `<div class='alphbet'>${alphbet}</div><div>(${
      randomColumn === "a" ? randomRow : combiAlpha
    })</div>`;
  });
};

main();
inject();
