const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var bruh;
var engine, world;
var back;
var player;
var mangoes = [];
var ground;
var slingshot;
var Playerslings = [];
var slings;

function preload(){
   back = loadImage("background.png");
}


function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  
  slingshot = new SlingShot(170, 650, 100 , 65);
  player = new Player(250, 650, 350, 285);


  for(var i = 0; i <= 4; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(150, 450);
    var mangoe = new Mangoes(x, y, 30);
    mangoes.push(mangoe);
  }
}

function draw() {
  background(back);
  Engine.update(engine);
  player.display();
  slingshot.display();

  for (var i = 0; i < Playerslings.length; i++) {
    showSlings(i, Playerslings);
  }

  for(var mangoe of mangoes){
    mangoe.display();
  }


keyPressed();
drawSprites();
}

function keyPressed() {
  if (keyCode === 32) {
    var posX = slingshot.body.position.x;
    var posY = slingshot.body.position.y;
    var angle = slingshot.body.angle;

    var slings = new Sling(posX, posY, 25, 25, angle);

    slings.trajectory = [];
    Matter.Body.setAngle(slings.body, angle);
    Playerslings.push(slings);
  }
}


  function keyReleased() {
    if (keyCode === 32) {
      if (Playerslings.length) {
        var angle = slingshot.body.angle + PI/2;
        Playerslings[Playerslings.length - 1].shoot(angle);
      }
    }
  }




function showSlings(index, slings) {
  slings[index].display();
}
