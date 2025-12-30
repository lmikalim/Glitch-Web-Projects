let words = [];
let gridSize = 10;
let wordSize = 20;
let gridSpacingX, gridSpacingY;
let repulsionRadius = 50;
let canvas;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(255);
    canvas.position(0,0);
 canvas.style('z-index','-1');
  // Calculate grid spacing based on window dimensions
  calculateGridSpacing();

  // Create an array of words and position them in a grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Skip creating a word in the 8th row, 7th column
      if (!(i === 7 && j === 6)) {
        let x = (j + 1) * gridSpacingX;
        let y = (i + 1) * gridSpacingY;
        words.push(new Word(x, y));
      }
    }
  }
}

function draw() {
  background(255);

  for (let word of words) {
    word.update();
    word.display();
  }
}

function mouseMoved() {
  for (let word of words) {
    let d = dist(mouseX, mouseY, word.x, word.y);
    if (d < repulsionRadius) {
      let angle = atan2(mouseY - word.y, mouseX - word.x);
      word.x -= cos(angle) * 2;
      word.y -= sin(angle) * 2;
      word.changeContent();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
  calculateGridSpacing();

  // Reposition the words in the grid after resizing
  let index = 0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Skip repositioning the 8th row, 7th column
      if (!(i === 7 && j === 6)) {
        words[index].x = (j + 1) * gridSpacingX;
        words[index].y = (i + 1) * gridSpacingY;
        index++;
      }
    }
  }
}

function calculateGridSpacing() {
  gridSpacingX = windowWidth / (gridSize + 1);
  gridSpacingY = windowHeight / (gridSize + 1);
}

class Word {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.text = "hello?";
  }

  update() {
    // Slightly move the word left and right
    this.x += random(-1, 1);
  }

  display() {
    textSize(wordSize);
    fill(0);
    text(this.text, this.x, this.y);
  }

  changeContent() {
    // Change the content of the word randomly
    let options = ["aaaah!", "get away!", "help!"];
    this.text = random(options);
  }
}
