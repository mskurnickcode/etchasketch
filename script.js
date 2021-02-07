const grid = document.getElementById('gridContainer')
const resetButton = document.getElementById('resetButton')
const active = document.getElementById('active')



//default event listeners
resetButton.addEventListener('click', reset)
active.addEventListener('click', setPaintingActive)


//defaults
var color = 'black';
var rows = 16;
var columns = 16;
var paintingActive = false;



// Set Grid Size

function makeGrid(rows,cols) {
    let area = rows * cols;
    for (var square = 0; square < area; square++) {
        let cell = document.createElement("div");
        grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        cell.id = "square:" + square;
        cell.className = "gridBlock"
        grid.insertAdjacentElement('beforeend', cell)
    }
    var cells = grid.querySelectorAll('div');
    cells.forEach(cell => cell.addEventListener('mouseover',addColor))
    cells.forEach(cell => cell.addEventListener('click', setPaintingActive))
}

window.onload = makeGrid(rows, columns)

//Sketch Function
function addColor() {
    if (paintingActive == true) {
        this.style.backgroundColor = color;
    }
}

function setPaintingActive() {
    console.log(event)
    console.log(paintingActive)
    if (paintingActive == true) {
        paintingActive = false;
        active.innerHTML = "Inactive"
    } else if (paintingActive == false) {
            paintingActive = true;
            active.innerHTML = "Active"
        }
}



// Reset
function reset() {
    var cells = grid.querySelectorAll('div');
    cells.forEach(cell => cell.style.backgroundColor = 'azure')
}