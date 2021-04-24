//GAME STATES
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var knife, knifeImg;
var fruit, fruit1, fruit2, fruit3, fruit4;
var gameOver, gameOverImg;
var bacteria, bacteriaImg;
var score = 0

function preload() {
  knifeImg = loadImage("sword.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  bacteriaImg = loadAnimation("alien1.png", "alien2.png");
  gameOverImg = loadImage("gameover.png");
}

function setup() {
  createCanvas(600, 480);
  //creat knife
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImg);
  knife.scale = 0.7;
  //create group
  fruitGroup = new Group();
  enemyGroup = new Group();

  score = 0;
}

function draw() {
  background("pink");

  fruits();
  Enemy();
  //knife movement
  if (gameState === PLAY) {
    knife.x = World.mouseX;
    knife.y = World.mouseY;
  }

  if (gameState === END) {
    knife.x = 300;
    knife.y = 230;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    knife.addImage(gameOverImg);
    knife.scale = 1.1;
  }
  //score
  if (knife.isTouching(fruitGroup)) {
    fruitGroup.destroyEach();
    score = score + 1;
  }
  //End game
  if (knife.isTouching(enemyGroup)) {
    gameState = END;
  }

  drawSprites();
  text("score=" + score, 520, 20);
}

function fruits() {
  if (World.frameCount % 80 == 0) {
    position = Math.round(random(1, 2));
    fruit = createSprite(600, 200, 20, 20);
    if (position === 1) {
      fruit.x = 400;
      fruit.velocityX = -(7 + (score / 4));
    } else {
      if (position === 2) {
        fruit.x = 0;
        fruit.velocityX = (7 + (score / 4));
      }
    }
    fruit.scale = 0.2;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else if (r == 4) {
      fruit.addImage(fruit4);
    }
    fruit.y = Math.round(random(50, 340));
    fruit.setLifetime = 100;


    fruitGroup.add(fruit);
  }
}

function Enemy() {
  if (World.frameCount % 200 === 0) {
    bacteria = createSprite(400, 200, 20, 20);
    bacteria.addAnimation("1", bacteriaImg);
    bacteria.y = Math.round(random(100, 300));
    bacteria.velocityX = -(8 + (score / 1));
    bacteria.setlifetime = 50;

    enemyGroup.add(bacteria);
  }
}
