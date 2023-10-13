import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Wake Me Up";
let counter: number = 0;
let then = performance.now();
let growthRate: number = 0;
const costUp: number = 1.15;
let fps = 0;

document.title = gameName;

const header = document.createElement("h1");
const sleepHeader = document.createElement("h1");
header.innerHTML = gameName;
sleepHeader.innerHTML = "💤🛌🏻";

//create button elements
const button: HTMLButtonElement = document.createElement("button");
const slapDisplay: HTMLDivElement = document.createElement("div");
const growthDisplay: HTMLDivElement = document.createElement("div");

//set the button text
button.textContent = "SLAP 🖐️";
slapDisplay.textContent = `🖐️ slap count: ${counter.toFixed(1)}`;
growthDisplay.textContent = `📈 Slap Assist Rate: ${growthRate} slaps/sec`;

//append starter buttons
app.append(header);
app.append(sleepHeader);
app.append(button);
app.append(slapDisplay);
app.append(growthDisplay);

interface Item {
  name: string;
  cost: number;
  growth: number;
  amount: number;
  emoji: string;
  buttons: HTMLButtonElement;
  accuGrowth: number;
  desc: string;
}

const availableItems: Item[] = [
  {
    name: "A Helping Hand",
    cost: 10,
    growth: 0.1,
    amount: 0,
    emoji: "🙋",
    buttons: document.createElement("button"),
    accuGrowth: 0,
    desc: "call a friend to help",
  },
  {
    name: "Slap Machine",
    cost: 100,
    growth: 2,
    amount: 0,
    emoji: "🗿",
    buttons: document.createElement("button"),
    accuGrowth: 0,
    desc: "*beep* *boop*",
  },
  {
    name: "World Champion Slapper",
    cost: 1000,
    growth: 50,
    amount: 0,
    emoji: "🏋️‍♂️",
    buttons: document.createElement("button"),
    accuGrowth: 0,
    desc: "the strongest hand slap",
  },
  {
    name: "Gym Socks",
    cost: 2000,
    growth: 100,
    amount: 0,
    emoji: "🧦",
    buttons: document.createElement("button"),
    accuGrowth: 0,
    desc: "maybe the smell will help",
  },
  {
    name: "Adam Smith",
    cost: 4000,
    growth: 200,
    amount: 0,
    emoji: "🧔🏼",
    buttons: document.createElement("button"),
    accuGrowth: 0,
    desc: "his slap will haunt your dream",
  },
];

//event listener
button.addEventListener("click", countFunction);

createItems(availableItems);

for (let i = 0; i < availableItems.length; i++) {
  availableItems[i].buttons.addEventListener("click", () => {
    updatedUpgrade(availableItems[i]);
  });
}

requestAnimationFrame(improvedFrameFunc);

// functions /////////////////////////////////////////////////
function countFunction() {
  counter++;
  slapDisplay.textContent = `🖐️ slap count: ${counter}`;
}

function improvedFrameFunc() {
  fps = Math.round(1000 / (performance.now() - then));
  for (let i = 0; i < availableItems.length; i++) {
    if (availableItems[i].amount > 0) {
      counter += availableItems[i].accuGrowth / fps;
      slapDisplay.textContent = `🖐️ slap count: ${counter.toFixed(1)}`;
    }
    availableItems[i].buttons.disabled = counter < availableItems[i].cost;
  }
  then = performance.now();
  fps = 0;
  requestAnimationFrame(improvedFrameFunc);
}

function updatedUpgrade(item: Item) {
  if (counter >= item.cost) {
    counter -= item.cost;
    item.amount += 1;
    growthRate += item.growth;
    item.cost = round(item.cost) * costUp;
    item.accuGrowth += item.growth;
    item.buttons.textContent = `${item.emoji} ${item.name} (${
      item.amount
    })| Cost ${round(item.cost)} | ${item.desc} |`;
    growthDisplay.textContent = `📈 Slap Assist Rate: ${growthRate.toFixed(
      1,
    )} slaps/sec`;
  }
}

function createItems(availableItems: Item[]) {
  for (let i = 0; i < availableItems.length; i++) {
    availableItems[i].buttons.textContent = `${availableItems[i].emoji} ${
      availableItems[i].name
    } (${availableItems[i].amount}) | Cost ${round(availableItems[i].cost)} | ${
      availableItems[i].desc
    } |`;
    availableItems[i].buttons.disabled = counter < availableItems[i].cost;
    app.append(availableItems[i].buttons);
  }
}

function round(num: number) {
  const roundedNum = Math.round(num * 100) / 100;
  return roundedNum;
}
