import { sample } from "lodash";
import { inject } from "@vercel/analytics";

import { hiraganas } from "./constants/hiragana";
import { katakanas } from "./constants/katakana";
import { convertAlphabet } from "./converter";

const getJPAlphabet = () => {
  const alphaType = location.pathname.includes("hiragana")
    ? "hiragana"
    : "katakana";

  return alphaType === "hiragana" ? hiraganas : katakanas;
};

const pickRandom = (jpAlphabets) => {
  const randomRow = sample(hiraganas.meta.rowLabels);
  const randomColumn = sample(hiraganas.meta.columnLabels);

  const hiragana =
    hiraganas.table[hiraganas.meta.columnLabels.indexOf(randomColumn)][
      hiraganas.meta.rowLabels.indexOf(randomRow)
    ];

  if (!hiragana) {
    return pickRandom(jpAlphabets);
  }

  return { randomRow, randomColumn, hiragana };
};

const main = () => {
  const container = document.querySelector(".container");
  const contentsWrapper = document.querySelector(".container > h1");

  container.addEventListener("click", () => {
    // pick random row and column
    const { randomRow, randomColumn, hiragana } = pickRandom(getJPAlphabet());

    const combiAlpha = convertAlphabet(`${randomColumn}${randomRow}`);

    contentsWrapper.innerHTML = `<div class='hiragana'>${hiragana}</div><div>(${
      randomColumn === "a" ? randomRow : combiAlpha
    })</div>`;
  });
};

main();
inject();
