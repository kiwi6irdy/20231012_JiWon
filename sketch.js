var song1, song2;
var button1, button2;
var sliderRate;
var jumpButton, volUpButton, volDownButton;
var amp;

let img;
let vol = 0.5;
let particles = []; 

let jumpPositions = [0, 0, 0, 0, 0]; 
let currentJump = 0; 
let totalDuration1 = 172; 
let totalDuration2 = 227; 

function preload() {
  img = loadImage("images.jpg");
  song1 = loadSound('fatcity.mp3');
  song2 = loadSound('OS.mp3');
}

function setup() {
  createCanvas(640, 640);

  button1 = createButton('Play Song 1');
  button1.mousePressed(togglePlayingSong1);

  button2 = createButton('Play Song 2');
  button2.mousePressed(togglePlayingSong2);

  jumpButton = createButton('Jump');
  jumpButton.mousePressed(jumpSong);

  volUpButton = createButton('Volume Up');
  volUpButton.mousePressed(volumeUp);

  volDownButton = createButton('Volume Down');
  volDownButton.mousePressed(volumeDown);

  song1.setVolume(vol);
  song2.setVolume(vol);

  sliderRate = createSlider(0, 1.5, 1, 0.01);

  for (let i = 0; i < 30; i++) {
    particles.push(new Particle());
  }

  amp = new p5.Amplitude();

  
  jumpPositions[0] = 0;
  jumpPositions[1] = totalDuration1 / 5;
  jumpPositions[2] = totalDuration1 * 2 / 5;
  jumpPositions[3] = totalDuration1 * 3 / 5;
  jumpPositions[4] = totalDuration1 * 4 / 5;
}

function togglePlayingSong1() {
  if (!song1.isPlaying()) {
    song2.stop();
    button2.html('Play Song 2');
    song1.play();
    button1.html('Pause Song 1');
  } else {
    song1.stop();
    button1.html('Play Song 1');
  }
}

function togglePlayingSong2() {
  if (!song2.isPlaying()) {
    song1.stop();
    button1.html('Play Song 1');
    song2.play();
    button2.html('Pause Song 2');
  } else {
    song2.stop();
    button2.html('Play Song 2');
  }
}

function jumpSong() {
  if (song1.isPlaying()) {
    
    song1.jump(jumpPositions[currentJump]);
    currentJump = (currentJump + 1) % jumpPositions.length; 
  } else if (song2.isPlaying()) {
    
    song2.jump(jumpPositions[currentJump]);
    currentJump = (currentJump + 1) % jumpPositions.length; 
  }
}

function volumeUp() {
  vol = constrain(vol + 0.2, 0, 1); 
  console.log('Volume Up:', vol);
  song1.setVolume(vol);
  song2.setVolume(vol);
}

function volumeDown() {
  vol = constrain(vol - 0.2, 0, 1); 
  console.log('Volume Down:', vol);
  song1.setVolume(vol);
  song2.setVolume(vol);
}

function draw() {
  background(0); 
  image(img, 0, 0, 640, 640); 
  var volLevel = amp.getLevel(); 
  var diam = map(volLevel, 0, 0.3, 10, 200);


  particles.forEach(p => {
    p.update(volLevel);  
    p.display();         
  });

  song1.rate(sliderRate.value());
  song2.rate(sliderRate.value());
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(5, 15);
    this.speed = random(1, 3);
    this.angle = random(TWO_PI);
    this.color = color(random(50, 100), random(50, 100), random(50, 100), 150); }

  update(level) {
    // 입자의 이동
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
    this.size = map(level, 0, 0.3, 5, 50);

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = random(width);
      this.y = random(height);
    }
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size); }
}
