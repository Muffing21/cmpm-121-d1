import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Wake Me Up";
let counter: number = 0;
let timer: DOMHighResTimeStamp = 0;
let then = performance.now();
const item = { A: 0, B: 0, C: 0 };
const itemCost = { A: 10, B: 100, C: 1000 };
let growthRate: number = 0;

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

app.append(header);

//create button elements
const button: HTMLButtonElement = document.createElement("button");
const upgradeButtonA: HTMLButtonElement = document.createElement("button");
const upgradeButtonB: HTMLButtonElement = document.createElement("button");
const upgradeButtonC: HTMLButtonElement = document.createElement("button");

//set the button text
button.type = "button";
button.textContent = "💤🛌🏻😴";
//upgrade button text
upgradeButtonA.type = "button";
upgradeButtonA.textContent = "Cost 10: A Helping Hand";
upgradeButtonB.type = "button";
upgradeButtonB.textContent = "Cost 100: Slap Machine";
upgradeButtonC.type = "button";
upgradeButtonC.textContent = "Cost 1000: World Champion Slapper";

//create div object
const slapDisplay: HTMLDivElement = document.createElement("div");
const growthDisplay: HTMLDivElement = document.createElement("div");
const itemDisplayA: HTMLDivElement = document.createElement("div");
const itemDisplayB: HTMLDivElement = document.createElement("div");
const itemDisplayC: HTMLDivElement = document.createElement("div");

slapDisplay.textContent = `slap count: ${counter.toFixed(1)}`;
growthDisplay.textContent = `Growth Rate: ${growthRate} slaps/sec`;
itemDisplayA.textContent = `number of Helping Hands: ${item.A}`;
itemDisplayB.textContent = `number of Slap Machines: ${item.B}`;
itemDisplayC.textContent = `number of World Slapping Champions: ${item.C}`;

//append buttons
app.append(button);
app.append(upgradeButtonA);
app.append(upgradeButtonB);
app.append(upgradeButtonC);

app.append(slapDisplay);
app.append(growthDisplay);
app.append(itemDisplayA);
app.append(itemDisplayB);
app.append(itemDisplayC);

// setInterval(countFunction, 1000);

//misc
if (counter < 10) {
  upgradeButtonA.disabled = true;
}
if (counter < 100) {
  upgradeButtonB.disabled = true;
}
if (counter < 1000) {
  upgradeButtonC.disabled = true;
}

//event listener
upgradeButtonA.addEventListener("click", upgradeFunction);
upgradeButtonB.addEventListener("click", upgradeFunctionB);
upgradeButtonC.addEventListener("click", upgradeFunctionC);

button.addEventListener("click", countFunction);

window.requestAnimationFrame(frameFunction);

function countFunction() {
  counter++;
  slapDisplay.textContent = `slap count: ${counter}`;
}

function frameFunction() {
  timer += performance.now() - then;
  if (timer >= 1000) {
    if (item.A > 0) {
      counter += 0.1;
      slapDisplay.textContent = `slap count: ${counter.toFixed(1)}`;
      itemDisplayA.textContent = `number of Helping Hands: ${item.A}`;
      growthDisplay.textContent = `Growth Rate: ${growthRate} slaps/sec`;
    }
    if (item.B > 0) {
      counter += 2;
      slapDisplay.textContent = `slap count: ${counter.toFixed(1)}`;
      itemDisplayB.textContent = `number of Slap Machines: ${item.B}`;
      growthDisplay.textContent = `Growth Rate: ${growthRate} slaps/sec`;
    }
    if (item.C > 0) {
      counter += 50;
      slapDisplay.textContent = `slap count: ${counter.toFixed(1)}`;
      itemDisplayC.textContent = `number of World Slapping Champions: ${item.C}`;
      growthDisplay.textContent = `Growth Rate: ${growthRate} slaps/sec`;
    }
    timer = 0;
  }

  upgradeButtonA.disabled = counter < itemCost.A;
  upgradeButtonB.disabled = counter < itemCost.B;
  upgradeButtonC.disabled = counter < itemCost.C;

  then = performance.now();
  window.requestAnimationFrame(frameFunction);
}

function upgradeFunction() {
  if (counter >= itemCost.A) {
    counter -= itemCost.A;
    item.A += 1;
    growthRate += 0.1;
  }
}
function upgradeFunctionB() {
  if (counter >= itemCost.B) {
    counter -= itemCost.B;
    item.B += 1;
    growthRate += 2;
  }
}

function upgradeFunctionC() {
  if (counter >= itemCost.C) {
    counter -= itemCost.C;
    item.C += 1;
    growthRate += 50;
  }
}
