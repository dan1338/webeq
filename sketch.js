function setup() {
  createCanvas(windowWidth, windowHeight/2);
  layoutGui();
}

function windowResized(e) {
  resizeCanvas(windowWidth, windowHeight/2);
}

let audioCtx = new AudioContext();
let audioBuf;
let audioSource;

function layoutGui() {
  let openFileBtn = createFileInput(openFile);
  openFileBtn.style('padding: 15px; margin: 15px');
  let startBtn = createButton('Play');
  startBtn.mousePressed(_ => startPlayback());
  let pauseBtn = createButton('Pause');
  pauseBtn.mousePressed(_ => stopPlayback());
}

function startPlayback() {
  audioSource = audioCtx.createBufferSource();
  audioSource.buffer = audioBuf;
  audioSource.connect(audioCtx.destination);
  audioSource.start();
}

function stopPlayback() {
  if (audioSource) {
    audioSource.stop();
    audioSource = null;
  }
}

async function openFile(e) {
  let fileArrayBuf = await e.file.arrayBuffer();
  audioBuf = await audioCtx.decodeAudioData(fileArrayBuf);
  
}

function draw() {
  background('#202030');
  
  for (let i = 0; i < windowWidth; i++) {
    line(i, 0, 0, 0);
    stroke('red');
  }
}
