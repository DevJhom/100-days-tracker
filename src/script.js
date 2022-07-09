const container = document.querySelector('.container')

//initialize 
let boxesArray = [];
let dateOfLastClick;

if(localStorage.getItem("boxesArray") === null) {
    for(let i = 0; i < 100; i++){
        boxesArray.push(false);
    }
    localStorage.setItem("boxesArray", JSON.stringify(boxesArray));
}else {
    boxesArray = JSON.parse(localStorage.getItem("boxesArray"));
    dateOfLastClick = localStorage.getItem("dateOfLastClick");    
}

renderBoxes();

function renderBoxes() {

    boxesArray.forEach((isThisBoxFilled,boxIndex) => {
        const box = document.createElement('div')
        box.id = boxIndex
        box.classList.add('box')

        if(isThisBoxFilled){
            updateBoxStatus(box)
        }else{
            makeBoxClickable(box, boxIndex)
        }

        container.appendChild(box)

    })

    if(!isTodayClickable()){
        makeAllBoxesUnclickable();
    }
}

function isTodayClickable(){
    if(dateOfLastClick == getTodayDate())
        return false
    else
        return true
}

function getTodayDate(){
    const date = new Date();
    const today = date.getDate();
    return today.toString();
}

function makeBoxClickable(boxEl, boxIndex){
   boxEl.addEventListener('click', () => {
        boxIsClicked(boxEl, boxIndex)
   })
}

//This function will be executed when a box is clicked
function boxIsClicked(boxEl, boxIndex){
    boxesArray[boxIndex] = true
    dateOfLastClick = getTodayDate()
    localStorage.setItem("boxesArray", JSON.stringify(boxesArray));
    localStorage.setItem("dateOfLastClick", getTodayDate());

    updateBoxStatus(boxEl)
    makeAllBoxesUnclickable()
    updateStatus()
    updateCount()

}

function updateBoxStatus(boxEl){
    boxEl.classList.add('clicked')
}

function makeAllBoxesUnclickable(){
    boxesArray.forEach((isThisBoxFilled, boxIndex) => {
        box = document.getElementById(boxIndex)
        //Remove event listeners from Element
        box.replaceWith(box.cloneNode(true));   
    })
}

//TODAY STATUS
const statusDiv = document.querySelector('.status')
const completed = document.querySelector('.completed')
const incomplete = document.querySelector('.incomplete')

updateStatus()

function updateStatus() {
    if(isTodayClickable()){
        completed.style.display = 'none'
        incomplete.style.display = 'block'
    }else{
        completed.style.display = 'block'
        incomplete.style.display = 'none'
    }
}

//UPDATE COUNT NUMBER

const countEl = document.getElementById('count')

updateCount()

function updateCount(){
    const boxesArray_true = boxesArray.filter(value => value === true)
    countEl.innerText = boxesArray_true.length
}