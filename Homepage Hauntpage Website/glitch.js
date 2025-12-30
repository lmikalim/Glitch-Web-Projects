let img;
function preload(){
  
}
function setup() {
  createCanvas(windowWidth, windowHeight);
    frameRate(8);

}



function draw() {
  
  
  noStroke();
  fill(0,0,0);
  for(let i = 0; i < 300; i++){
  textFont("Futura");
    textStyle(BOLD);
          
  write( random(windowWidth), random(windowHeight));


}

}

function write(x,y){
    dos = [1,2];

      fill(255,255,0);
      rect(x,y-18,50,18);
  
  if(random(dos) == 1){
        fill(255,0,0);
  }else{
    fill(0);
  }

      textSize(20);
      text("Home", x, y);
}



function windowResized(){
  setup();
  
}
function switchBG(){
  
   background(0);
  

 
}