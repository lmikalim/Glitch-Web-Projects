let gridSize = 10;
let cellWidth, cellHeight;
let words = [];
let centralGridText = "Homepage"; // Text for the center of the 4x3 grid

let customFont;

function preload() {
  
  // Load the custom font
  //customFont = loadFont('PlayfairDisplay-Italic.ttf');
}

function setup() {
   canvas = createCanvas(windowHeight, windowWidth);
  canvas.position(0,0);
 resizeCanvas(windowWidth, windowHeight);


 canvas.style('z-index','-1');

  textFont('Playfair Display, sans-serif');
  createCanvas(windowWidth, windowHeight);
   
  background(0);
  textAlign(CENTER, CENTER);
  textSize(50);
        background(0);

  // Define the grid dimensions
  let cols = gridSize;
  let rows = gridSize;
  cellWidth = windowWidth / cols;
  cellHeight = windowHeight / rows;

  // Create the 10x10 grid of "web" text (size 30)
  textSize(30);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellWidth;
      let y = j * cellHeight;

      // Create a 4x3 grid in the center
      if (i >= 3 && i <= 6 && j >= 4 && j <= 6) {
        fill(0);
        rect(x, y, cellWidth, cellHeight);
      } else {
        fill(255);
        let xOffset = random(-2, 2);
        let word = new Word(x + cellWidth / 2 + xOffset, y + cellHeight / 2);
        words.push(word);
      }
    }
  }
}

function draw() {
 background(0);
  
  // Mouse interaction logic for smaller words
  for (let word of words) {
    word.update();
    word.display();
    let d = dist(mouseX, mouseY, word.x, word.y);
    if (d < 20) {
      word.changeContent();
    }
  }

  // Mouse interaction logic for the big "Homepage" text
  let dHomepage = dist(mouseX, mouseY, width / 2, height / 2);
  if (dHomepage < 40) { // Adjust the radius as needed
    changeCentralText();
  } else {
    // Reset the text when the mouse is not hovering over it
    centralGridText = "Homepage";
  }

  // Draw white text centered in the center of the 4x3 grid space
  textSize(80);
  fill(255);
  text(centralGridText, width / 2, height / 2);
  textSize(30);
  text("by Mika Lim", width/2, (height/2) +100);
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  setup();

}

function changeCentralText() {
  // Change the content of the central text randomly
  let options = ["Hauntpage"];
  centralGridText = random(options);
}

class Word {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.text = "web?";
  }

  update() {
    // Slightly move the word left and right
    this.x += random(-1, 1);
  }

  display() {
    textSize(20); // Reduced size to 20
    fill(255); // White text
    text(this.text, this.x, this.y);
  }

  changeContent() {
    // Change the content of the word randomly
    let options = ["home", "page", "house"];
    this.text = random(options);
  }
}
