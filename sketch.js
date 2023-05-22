let img1, img2;
let currentImg;
let textX, textY;
let textColor;
let mousePositions = [];
const MAX_POS = 50;

function preload() {
  img1 = loadImage("images/JPG-Meme12.jpg");
  img2 = loadImage("images/JPG-Meme13.jpg");
}

function setup() {
  createCanvas(600, 600);
  currentImg = img1;
  textStyle('bold');
  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  textSize(25);
  textX = width / 2;
  textY = height / 2;
  textColor = color(200, 90, 50);
}

function draw() {
  background(220);

  image(currentImg, 0, 0, width, height);
  fill(textColor);
  text("It's peanut butter jelly time", textX, textY);


  drawStar(mouseX, mouseY, 5, 15, 5);


  mousePositions.push({ x: mouseX, y: mouseY });

  if (mousePositions.length > MAX_POS) {
    mousePositions.shift();
  }

  for (let i = 0; i < mousePositions.length; i++) {
    let pos = mousePositions[i];
    let size = map(i, 0, mousePositions.length - 1, 5, 15);
    drawStar(pos.x, pos.y, size, 15, 5);
  }
}

function mousePressed() {
  if (currentImg == img1) {
    currentImg = img2;
  } else {
    currentImg = img1;
  }

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // Calculate text width and height
    let textW = textWidth("It's peanut butter jelly time");
    let textH = textAscent() + textDescent();

    textX = random([textW / 2, width - textW / 2]);
    textY = random([textH / 2, height - textH / 2]);
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
