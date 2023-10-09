import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Wake Me Up";
let counter: number = 0;
let timer: DOMHighResTimeStamp = 0;
let then = performance.now();
let itemBought: boolean = false;

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

app.append(header);

//create button elements
const button: HTMLButtonElement = document.createElement("button");
const upgradeButton1: HTMLButtonElement = document.createElement("button");

//set the button text
button.type = "button";
button.textContent = "💤🛌🏻😴";
//upgrade button text
upgradeButton1.type = "button";
upgradeButton1.textContent = "Cost 10: A Helping Hand";

//create slap object
const slapDisplay: HTMLDivElement = document.createElement("div");
slapDisplay.textContent = `slap count: ${counter}`;

//append buttons
app.append(button);
app.append(upgradeButton1);
app.append(slapDisplay);
// setInterval(countFunction, 1000);

//misc
if (counter < 10) {
  upgradeButton1.disabled = true;
}

//event listener
upgradeButton1.addEventListener("click", upgradeFunction);
button.addEventListener("click", countFunction);

window.requestAnimationFrame(frameFunction);

function countFunction() {
  counter++;
  slapDisplay.textContent = `slap count: ${counter}`;
}

function frameFunction() {
  timer += performance.now() - then;
  if (timer >= 1000 && itemBought == true) {
    counter += 1;
    slapDisplay.textContent = `slap count: ${counter}`;
    console.log(counter);
    timer = 0;
  }
  upgradeButton1.disabled = counter < 10;

  then = performance.now();
  window.requestAnimationFrame(frameFunction);
}

function upgradeFunction() {
  if (counter >= 10) {
    counter -= 10;
    slapDisplay.textContent = `slap count: ${counter}`;
    itemBought = true;
  }
}
