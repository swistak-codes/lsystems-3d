import LSystem from "lindenmayer";
import { data } from "./data";
import {
  closeBranch,
  createBranch,
  forward,
  init,
  render,
  reset,
  rotate,
} from "./3d";

const canvas = document.getElementById("canvas");
const input = document.getElementById("iterations");
const display = document.getElementById("current");
const button = document.getElementById("redraw");

const params = new URLSearchParams(window.location.search);
const dataId = params.get("data") || "hilbert";

const lData = data[dataId];

const noop = () => {};

function draw() {
  const iterations = input.valueAsNumber;
  reset();

  const l = new LSystem({
    axiom: lData.axiom,
    productions: lData.productions,
    finals: {
      F: lData.models.F ? forward(lData.models.F) : noop,
      f: forward,
      L: lData.models.L ? forward(lData.models.L) : noop,
      S: lData.models.S ? forward(lData.models.S) : noop,
      "+": rotate("z", lData.angle),
      "-": rotate("z", -lData.angle),
      "&": rotate("y", lData.angle),
      "^": rotate("y", -lData.angle),
      "\\": rotate("x", lData.angle),
      "/": rotate("x", -lData.angle),
      "|": rotate("z", 180),
      "[": createBranch,
      "]": closeBranch,
    },
  });

  l.iterate(iterations);
  l.final();

  display.innerText = l.getString();
  render();
}

input.onchange = () => draw();
input.max = `${lData.maxIterations}`;
button.onclick = () => draw();
button.style.display = lData.redraw ? "block" : "none";

init(canvas);
draw();
