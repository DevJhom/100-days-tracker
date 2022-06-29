const container = document.querySelector('.container')

//array of booleans to identify which boxes are already filled
let boxesFilled = [];

for(let i = 0; i < 100; i++){
    boxesFilled.push(false);
}

//delete this later
boxesFilled[1] = true
boxesFilled[99] = true
boxesFilled[55] = true

//retrieve from database or localStorage later
let DateOfLastClick = 28

createBoxes();

function createBoxes() {
    boxesFilled.forEach((isFilled,isFilledIndex) => {
        const box = document.createElement('div')
        box.id = isFilledIndex
        box.classList.add('box')

        if(isTodayClickable() && !isFilled){
            makeBoxClickable(box, isFilledIndex)
        }else{
            updateBoxStatus(box)
        }

        container.appendChild(box)

    })
}

function isTodayClickable(){
    if(DateOfLastClick === getTodayDate())
        return false
    else
        return true
}

function getTodayDate(){
    const date = new Date();
    const today = date.getDate();
    return today
}

function makeBoxClickable(boxEl, isFilledIndex){
   boxEl.addEventListener('click', () => {
        boxIsClicked(boxEl, isFilledIndex)
   })
}

function boxIsClicked(boxEl, isFilledIndex){
    updateBoxStatus(boxEl)
    boxesFilled[isFilledIndex] = true
    DateOfLastClick = getTodayDate()

    makeAllBoxesUnclickable()
}

function updateBoxStatus(boxEl){
    boxEl.classList.add('clicked')
}

function makeAllBoxesUnclickable(){
    boxesFilled.forEach((isFilled, isFilledIndex) => {
        box = document.getElementById(isFilledIndex)
        //Remove event listeners from Element
        box.replaceWith(box.cloneNode(true));   
    })
}