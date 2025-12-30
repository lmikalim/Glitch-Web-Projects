function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(4);
  degrees(0);
}

function draw() {
  background(255);
  noStroke();
  fill(0,0,0);
  for(let i = 0; i < windowWidth; i++){

  drawMickey(random(windowWidth),random(windowHeight),random(10,90),color(random(255),random(255),random(255)));
   


}

}


function drawMickey(x,y,radius,color){
  

 rotate(random(1,90));
   blendMode(MULTIPLY);
  fill(100,100,250);
  
  

   circle(x+10, y+5, radius*1.2);
   circle(x-(radius/2)+10, y-(radius/2)+5, (radius/1.6)*1.3); 
   circle(x+(radius/2)+10, y-(radius/2)+5, (radius/1.6)*1.3);
 
   
  blendMode(BLEND);
  fill('#FFEDA3 ');
  
   circle(x, y, radius*1.2);
   circle(x-(radius/2), y-(radius/2), (radius/1.6)*1.3); 
   circle(x+(radius/2), y-(radius/2), (radius/1.6)*1.3);
 
  fill(color);
   circle(x, y, radius);
   circle(x-(radius/2), y-(radius/2), (radius/1.6)); // left ear
   circle(x+(radius/2), y-(radius/2), (radius/1.6));
  fill(random(100,255),random(40,100),random(40,90));
   circle(x, y, radius/1.6);
  fill(random(40),random(40),random(40));
  rect(x+(radius/8),y,radius/9,4);
  rect(x-(radius/4),y,radius/9,4);
  rect(x-(radius/20),y+(radius/7),radius/9,4);
  fill(255,255,255);
  rect(x+(radius/8),y,radius/20,5);
  rect(x-(radius/4),y,radius/20,5);
   fill('#D2A900');
  blendMode(ADD);
  circle(x-(radius/1.7),y-(radius/2),radius/5);
  circle(x+(radius/2),y-(radius/2),radius/5);

   
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
}