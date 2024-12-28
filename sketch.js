function setup() {
  createCanvas(windowWidth, windowHeight/2);
  
  layoutGui();
}

function windowResized(e) {
  resizeCanvas(windowWidth, windowHeight/2);
}

function layoutGui() {
  let openFileBtn = createFileInput(openFile);
  openFileBtn.style('padding: 15px; margin: 15px');
}

let audioCtx = new AudioContext();
let audioSource;

async function openFile(e) {
  let fileArrayBuf = await e.file.arrayBuffer();
  let audioBuf = await audioCtx.decodeAudioData(fileArrayBuf);
  
  print(audioBuf.getChannelData(0));
  
  audioSource = audioCtx.createBufferSource();
  audioSource.buffer = audioBuf;
  
  audioSource.connect(audioCtx.destination);
  audioSource.start();
}

function draw() {
  background('#202030');

}
