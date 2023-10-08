import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Wake Me Up";
//const testing = "test";
const buttonText = "💤🛌🏻😴";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

app.append(header);

//create a button element
const button: HTMLButtonElement = document.createElement("button");

//set the button text
button.type = "button";
button.innerHTML = buttonText;
app.append(button);

//const mainButton: HTMLButtonElement = document.createElement("button");
