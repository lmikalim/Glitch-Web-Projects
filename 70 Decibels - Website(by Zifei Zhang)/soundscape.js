let soundsNum, buttonsHeight, amp;
let trainSound,
  planeSound,
  constructionSound,
  ctaSound,
  highwaySound,
  festSound;

function preload() {
  //Load Sounds
  trainSound = loadSound(
    "https://cdn.glitch.global/0fade302-1e5f-4f3a-bfb7-c3e1cea8fe7a/FreightTrain.mp3?v=1700459398339"
  );
  planeSound = loadSound(
    "https://cdn.glitch.global/0fade302-1e5f-4f3a-bfb7-c3e1cea8fe7a/PlanesOverhead.mp3?v=1700459402715"
  );
  constructionSound = loadSound(
    "https://cdn.glitch.global/0fade302-1e5f-4f3a-bfb7-c3e1cea8fe7a/Construction.mp3?v=1700459390145"
  );
  ctaSound = loadSound(
    "https://cdn.glitch.global/0fade302-1e5f-4f3a-bfb7-c3e1cea8fe7a/CTA.mp3?v=1700459395283"
  );
  highwaySound = loadSound(
    "https://cdn.glitch.global/0fade302-1e5f-4f3a-bfb7-c3e1cea8fe7a/Highway.mp3?v=1700459401096"
  );
  festSound = loadSound(
    "https://cdn.glitch.global/0fade302-1e5f-4f3a-bfb7-c3e1cea8fe7a/RiotFest.mp3?v=1700459406718"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  amp = new p5.Amplitude();
  buttonsHeight = windowHeight / 2 - 150;
}

function draw() {
  background(0);

  // Create circular buttons
  fill(0);
  stroke(255);
  strokeWeight(1);

  soundsNum = 6;
  let buttonsLim = soundsNum * 100;
  let buttonsCol = windowWidth / 2 - buttonsLim / 2 + 50;

  for (let col = buttonsCol; col < buttonsCol + buttonsLim; col += 100) {
    circle(col, buttonsHeight, 50);
  }

  // Fill in circle when sounds are playing and create audiovis
  fill(255);

  if (trainSound.isPlaying()) {
    circle(buttonsCol, buttonsHeight, 50);
  }
  if (planeSound.isPlaying()) {
    circle(buttonsCol + 100, buttonsHeight, 50);
  }
  if (constructionSound.isPlaying()) {
    circle(buttonsCol + 200, buttonsHeight, 50);
  }
  if (ctaSound.isPlaying()) {
    circle(buttonsCol + 300, buttonsHeight, 50);
  }
  if (highwaySound.isPlaying()) {
    circle(buttonsCol + 400, buttonsHeight, 50);
  }
  if (festSound.isPlaying()) {
    circle(buttonsCol + 500, buttonsHeight, 50);
  }

  //Decibel Visualizer
  let vol = amp.getLevel();
  let volMap = map(vol, 0, 0.3, 0, 500);
  let lerpedColor = lerpColor(color(0, 255, 0), color(255, 0, 0), vol * 5);

  let rectStartX = windowWidth / 2 - volMap / 2;

  noStroke();
  fill(lerpedColor);
  rect(rectStartX, buttonsHeight + 75, volMap, 10, 20);

  if (
    trainSound.isPaused &&
    planeSound.isPaused &&
    constructionSound.isPaused &&
    ctaSound.isPaused &&
    highwaySound.isPaused &&
    festSound.isPaused
  ) {
    volMap = 0;
  }
}

function mousePressed() {
  let buttonsLim = soundsNum * 100;
  let buttonsCol = windowWidth / 2 - buttonsLim / 2 + 50;

  if (
    mouseX > buttonsCol - 25 &&
    mouseX < buttonsCol + 25 &&
    mouseY > buttonsHeight - 25 &&
    mouseY < buttonsHeight + 25
  ) {
    console.log("Train Button Pressed");
    if (trainSound.isPlaying()) {
      trainSound.stop();
      $("#trainInfo").removeClass("active");
    } else {
      trainSound.play();
      $("#trainInfo").addClass("active");
    }
  }

  if (
    mouseX > buttonsCol - 25 + 100 &&
    mouseX < buttonsCol + 25 + 100 &&
    mouseY > buttonsHeight - 25 &&
    mouseY < buttonsHeight + 25
  ) {
    console.log("Plane Button Pressed");
    if (planeSound.isPlaying()) {
      planeSound.stop();
      $("#planeInfo").removeClass("active");
    } else {
      planeSound.play();
      $("#planeInfo").addClass("active");
    }
  }

  if (
    mouseX > buttonsCol - 25 + 200 &&
    mouseX < buttonsCol + 25 + 200 &&
    mouseY > buttonsHeight - 25 &&
    mouseY < buttonsHeight + 25
  ) {
    console.log("Construction Button Pressed");
    if (constructionSound.isPlaying()) {
      constructionSound.stop();
      $("#constructionInfo").removeClass("active");
    } else {
      constructionSound.play();
      $("#constructionInfo").addClass("active");
    }
  }

  if (
    mouseX > buttonsCol - 25 + 300 &&
    mouseX < buttonsCol + 25 + 300 &&
    mouseY > buttonsHeight - 25 &&
    mouseY < buttonsHeight + 25
  ) {
    console.log("CTA Button Pressed");
    if (ctaSound.isPlaying()) {
      ctaSound.stop();
      $("#ctaSound").removeClass("active");
    } else {
      ctaSound.play();
      $("#ctaSound").addClass("active");
    }
  }

  if (
    mouseX > buttonsCol - 25 + 400 &&
    mouseX < buttonsCol + 25 + 400 &&
    mouseY > buttonsHeight - 25 &&
    mouseY < buttonsHeight + 25
  ) {
    console.log("Highway Button Pressed");
    if (highwaySound.isPlaying()) {
      highwaySound.stop();
      $("#highwaySound").removeClass("active");
    } else {
      highwaySound.play();
      $("#highwaySound").addClass("active");
    }
  }

  if (
    mouseX > buttonsCol - 25 + 500 &&
    mouseX < buttonsCol + 25 + 500 &&
    mouseY > buttonsHeight - 25 &&
    mouseY < buttonsHeight + 25
  ) {
    console.log("Riot Fest Button Pressed");
    if (festSound.isPlaying()) {
      festSound.stop();
      $("#festSound").removeClass("active");
    } else {
      festSound.play();
      $("#festSound").addClass("active");
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
