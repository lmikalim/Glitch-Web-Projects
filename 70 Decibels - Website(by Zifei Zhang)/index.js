let mic, fft, analyzer, vol;
let decibelCounter;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  analyzer = new p5.Amplitude();
  analyzer.setInput(mic);

  // Create the decibelCounter div element once
  decibelCounter = createDiv("").class("decibelCounter");
  decibelCounter.style("font-size", "100px");
  decibelCounter.style("color", "white");
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(3);
  noFill();

  let xCoord = windowWidth / 2;
  let yCoord = windowHeight / 2 + 10;

  translate(xCoord, yCoord);

  let wave = fft.waveform();
  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i <= 180; i += 0.5) {
      let index = floor(map(i, 0, 180, 0, wave.length - 1));

      let r = map(wave[index], -1, 1, 150, 350);

      let x = r * sin(i) * t;
      let y = r * cos(i);
      vertex(x, y);
    }
    endShape();
  }

  // noStroke();
  // fill("red");
  
  let vol = mic.getLevel();
  let roundedVol = round(vol* 1000);
  // text(roundedVol, 200, 200);
  

  // let vol = mic.getLevel() * 1000;
  // let roundedVol = round(vol);
  // // text(vol, 200, 200);
  // text(roundedVol, 200, 200);

  decibelCounter.html(roundedVol);
  decibelCounter.position(
    // xCoord-20,
    xCoord - decibelCounter.width / 40,
    yCoord - decibelCounter.height / 2 - 75
  );

  
  if (vol > 5) {

  let reminder = select("#centerText");
  reminder.addClass("reveal");

  // let reminder = createDiv("remember how loud this is").class("reminder");
  // reminder.position(xCoord - reminder.width / 5 + 40, yCoord + 40);
  // reminder.style("font-size", "14pt");
  // reminder.style("color", "white");
  // let startGame = createA(
  //   "https://70decibels.glitch.me/choose-your-home.html",
  //   "start game"
  // ).class("startGame");
  // startGame.position(xCoord - startGame.width / 2, yCoord + 80);

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
