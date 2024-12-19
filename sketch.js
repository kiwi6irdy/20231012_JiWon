var song1, song2;
var button1, button2;
var sliderRate, sliderPan, slider;
var jumpButton;
var amp;

let img;
let vol = 0.5;

function preload(){
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
  
  jumpButton = createButton('jump');
  jumpButton.mousePressed(jumpSong);
  
  amp = new p5.Amplitude();
  
  background(51);
  
  song1.setVolume(vol);
  song2.setVolume(vol);
  
  sliderRate = createSlider(0, 1.5, 1, 0.01);
  sliderPan = createSlider(-1, 1, 0, 0.01);
  slider = createSlider(0, 1, vol, 0.01);
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
  let len = song1.isPlaying() ? song1.duration() : song2.duration();
  let t = random(len);
  console.log('Jump to:', t);
  
  if (song1.isPlaying()) {
    song1.jump(t);
  } else if (song2.isPlaying()) {
    song2.jump(t);
  }
}

function draw() {
  background(255);
  image(img, 0, 0, 640, 640);
  
  var vol = amp.getLevel();
  var diam = map(vol, 0, 0.3, 10, 200);
  noStroke();
  fill(255, 0, 255);
  ellipse(width / 2, height / 2, diam, diam);
  fill(255, 255, 255);
  ellipse(width / 4, height / 4, diam, diam);
  fill(0, 0, 255);
  ellipse(width / 2, height / 4, diam, diam);


  vol = slider.value();
  
  song1.pan(sliderPan.value());
  song1.rate(sliderRate.value());
  song1.setVolume(vol);

  
  song2.pan(sliderPan.value());
  song2.rate(sliderRate.value());
  song2.setVolume(vol); 
}