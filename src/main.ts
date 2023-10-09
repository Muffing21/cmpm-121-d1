import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Wake Me Up";
let counter: number = 0;

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

app.append(header);

//create a button element
const button: HTMLButtonElement = document.createElement("button");

//set the button text
button.type = "button";
button.textContent = "💤🛌🏻😴";
app.append(button);

//create slap object
const slapDisplay: HTMLDivElement = document.createElement("div");
slapDisplay.textContent = `slap count: ${counter}`;

button.addEventListener("click", countFunction);

app.append(slapDisplay);

setInterval(countFunction, 1000);

function countFunction() {
  counter++;
  slapDisplay.textContent = `slap count: ${counter}`;
}
