const grid = document.getElementById('gridContainer')
const resetButton = document.getElementById('resetButton')
const active = document.getElementById('active')
const gridSizeSlider = document.getElementById('gridSize')
const colorSlider = document.getElementById('colorSlider')




//default event listeners
resetButton.addEventListener('click', reset)
active.addEventListener('click', setPaintingActive)


//defaults
var color = 'hsl(180 , 100%, 50%)';
var rows = 16;
var columns = 16;
var paintingActive = false;

//Change Attributes
var newGridSize = 0
var newBoxSize = 1

function resetGridContainer() {
    document.querySelectorAll('.gridBlock').forEach(e => e.remove());
}


gridSizeSlider.onmouseup = function(){
    console.log(`Grid Size: ${this.value}`)
    newGridSize = this.value;
    resetGridContainer();
    makeGrid(newGridSize,newGridSize)
}

colorSlider.onmouseup = function(){
    var hslcolor = "hsl(" + this.value + ", 100%, 50%)";
    console.log(`Color Code: ${hslcolor}`)
    color = hslcolor
    var RgbColor = hslToHex(this.value, 50, 50)
    colorSlider.textContent = ".rainbow::-webkit-slider-thumb { background: " + RgbColor + "; }";
}





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
        active.innerHTML = "Painting: Inactive"
    } else if (paintingActive == false) {
            paintingActive = true;
            active.innerHTML = "Painting: Active"
        }
}



// Reset
function reset() {
    var cells = grid.querySelectorAll('div');
    cells.forEach(cell => cell.style.backgroundColor = 'azure')
}

//HSL to RGB Converter
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }