const container = document.querySelector(".container");

//initialize
let boxesArray = [];
let dateOfLastClick;

//get values from localStorage
if (localStorage.getItem("boxesArray") === null) {
  for (let i = 0; i < 100; i++) {
    boxesArray.push(false);
  }
  localStorage.setItem("boxesArray", JSON.stringify(boxesArray));
} else {
  boxesArray = JSON.parse(localStorage.getItem("boxesArray"));
  dateOfLastClick = localStorage.getItem("dateOfLastClick");
}

renderBoxes();

function renderBoxes() {
  boxesArray.forEach((isThisBoxFilled, boxIndex) => {
    const box = document.createElement("div");
    box.id = boxIndex;
    box.classList.add("box");

    if (isThisBoxFilled) {
      fillUpBox(box);
    } else {
      makeBoxClickable(box, boxIndex);
    }

    container.appendChild(box);
  });

  if (!isTodayClickable()) {
    makeAllBoxesUnclickable();
  }
}

function fillUpBox(boxEl) {
  boxEl.classList.add("clicked");
}

function makeBoxClickable(boxEl, boxIndex) {
  boxEl.addEventListener("click", () => {
    boxIsClicked(boxEl, boxIndex);
  });
}

function makeAllBoxesUnclickable() {
  boxesArray.forEach((isThisBoxFilled, boxIndex) => {
    box = document.getElementById(boxIndex);
    //Remove event listener of all elements
    box.replaceWith(box.cloneNode(true));
  });
}

//DATE
function isTodayClickable() {
  if (dateOfLastClick == getTodayDate()) return false;
  else return true;
}

function getTodayDate() {
  const date = new Date();
  const today = date.getDate();
  return today.toString();
}

//This function will be executed when a box is clicked
function boxIsClicked(boxEl, boxIndex) {
  boxesArray[boxIndex] = true;
  dateOfLastClick = getTodayDate();
  localStorage.setItem("boxesArray", JSON.stringify(boxesArray));
  localStorage.setItem("dateOfLastClick", getTodayDate());

  fillUpBox(boxEl);
  makeAllBoxesUnclickable();
  updateClickStatus();
  updateCount();
}

//TODAY CLICK STATUS
const statusDiv = document.querySelector(".status");
const completed = document.querySelector(".completed");
const incomplete = document.querySelector(".incomplete");

updateClickStatus();

function updateClickStatus() {
  if (isTodayClickable()) {
    completed.style.display = "none";
    incomplete.style.display = "block";
  } else {
    completed.style.display = "block";
    incomplete.style.display = "none";
  }
}

//COUNTER
const countEl = document.getElementById("count");

updateCount();

function updateCount() {
  const boxesArray_true = boxesArray.filter((value) => value === true);
  countEl.innerText = boxesArray_true.length;
}
