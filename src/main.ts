import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Wake Me Up";
let counter: number = 0;
//let timer: DOMHighResTimeStamp = 0;
let then = performance.now();
const item = { A: 0, B: 0, C: 0 };
const itemCost = { A: 10, B: 100, C: 1000 };
const itemGrowth = { A: 0.1, B: 2, C: 50 };
let growthRate: number = 0;
const costUp: number = 1.15;
let fps = 0;

document.title = gameName;

const header = document.createElement("h1");
const sleepHeader = document.createElement("h1");
header.innerHTML = gameName;
sleepHeader.innerHTML = "💤🛌🏻";

app.append(header);
app.append(sleepHeader);

//create button elements
const button: HTMLButtonElement = document.createElement("button");
const upgradeButtonA: HTMLButtonElement = document.createElement("button");
const upgradeButtonB: HTMLButtonElement = document.createElement("button");
const upgradeButtonC: HTMLButtonElement = document.createElement("button");

//set the button text
button.type = "button";
button.textContent = "SLAP 🖐️";
//upgrade button text
upgradeButtonA.type = "button";
upgradeButtonA.textContent = "Cost 10: A Helping Hand 🙋";
upgradeButtonB.type = "button";
upgradeButtonB.textContent = "Cost 100: Slap Machine 🗿";
upgradeButtonC.type = "button";
upgradeButtonC.textContent = "Cost 1000: World Champion Slapper 🏋️‍♂️";

//create div object
const slapDisplay: HTMLDivElement = document.createElement("div");
const growthDisplay: HTMLDivElement = document.createElement("div");
const itemDisplayA: HTMLDivElement = document.createElement("div");
const itemDisplayB: HTMLDivElement = document.createElement("div");
const itemDisplayC: HTMLDivElement = document.createElement("div");

slapDisplay.textContent = `🖐️ slap count: ${counter.toFixed(1)}`;
growthDisplay.textContent = `📈 Growth Rate: ${growthRate} slaps/sec`;
itemDisplayA.textContent = `number of 🙋: ${item.A}`;
itemDisplayB.textContent = `number of 🗿: ${item.B}`;
itemDisplayC.textContent = `number of 🏋️‍♂️: ${item.C}`;

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
  //timer += performance.now() - then;
  fps = Math.round(1000 / (performance.now() - then));
  if (item.A > 0) {
    counter += itemGrowth.A / fps;
    slapDisplay.textContent = `🖐️ slap count: ${counter.toFixed(1)}`;
    upgradeButtonA.textContent = `A Helping Hand: Cost ${round(itemCost.A)} 🙋`;
    itemDisplayA.textContent = `number of 🙋: ${item.A}`;
    growthDisplay.textContent = `📈 Growth Rate: ${growthRate.toFixed(
      1,
    )} slaps/sec`;
  }
  if (item.B > 0) {
    counter += itemGrowth.B / fps;
    slapDisplay.textContent = `🖐️ slap count: ${counter.toFixed(0)}`;
    upgradeButtonB.textContent = `Cost ${round(itemCost.B)}: Slap Machine 🗿`;
    itemDisplayB.textContent = `number of 🗿: ${item.B}`;
    growthDisplay.textContent = `📈 Growth Rate: ${growthRate.toFixed(
      1,
    )} slaps/sec`;
  }
  if (item.C > 0) {
    counter += itemGrowth.C / fps;
    slapDisplay.textContent = `🖐️ slap count: ${counter.toFixed(0)}`;
    upgradeButtonC.textContent = `Cost ${round(
      itemCost.C,
    )}: World Champion Slapper 🏋️‍♂️`;
    itemDisplayC.textContent = `number of 🏋️‍♂️: ${item.C}`;
    growthDisplay.textContent = `📈 Growth Rate: ${growthRate.toFixed(
      1,
    )} slaps/sec`;
  }
  //timer = 0;

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
    itemCost.A = round(itemCost.A) * costUp;
    itemGrowth.A += 0.1;
  }
}
function upgradeFunctionB() {
  if (counter >= itemCost.B) {
    counter -= itemCost.B;
    item.B += 1;
    growthRate += 2;
    itemCost.B = round(itemCost.B) * costUp;
    itemGrowth.B += 2;
  }
}

function upgradeFunctionC() {
  if (counter >= itemCost.C) {
    counter -= itemCost.C;
    item.C += 1;
    growthRate += 50;
    itemCost.C = round(itemCost.C) * costUp;
    itemGrowth.C += 50;
  }
}

function round(num: number) {
  const roundedNum = Math.round(num * 100) / 100;
  return roundedNum;
}
