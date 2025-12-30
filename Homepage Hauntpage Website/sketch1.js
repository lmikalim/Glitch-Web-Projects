  let alphabet = ['a','b','c','⌂','e','⌂','⌂','h','i','⌂','𓊍','l','⌂','n','o','p','q','r','s','t','u','v','w','x','𓊍','𓊍','a','a','⌂','𓊍','e','⌂','o','𓊍','s','s','⌂'];
let x = 0;
let canvas;
function setup() {
  noStroke();
 
  canvas = createCanvas(windowHeight, windowWidth);
  canvas.position(0,0);
 resizeCanvas(windowWidth, windowHeight);

frameRate(8);
 canvas.style('z-index','-1');

}
  




function draw() {
   background(color(0,0,255));

  for (let x = 10; x < windowWidth; x += 50) {
    for (let y = 50; y < windowHeight; y += 50) {
      if (random() % 2 > 0.5) {
        fill(color(255,255,255));
        
       // fill(color(random(200), random(80), random(0)));
      } else {
        
         fill(color(255,255,255));
        //fill(color(random(200), random(80), random(0)));
      }

    //  circle(x, y, 40);
      //fill(255,255,255);
      textSize(50);
      if((mouseX - x) < 20 || (mouseY - y) < 20){
        x = x+ 5;
        y= y +5;
        
      }
      if((mouseY - y) < 20){
        x = x+ 5;
      }
      text(random(alphabet),x+3,y+2);
      
      
    }
  }
  

}
//Allows for window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}