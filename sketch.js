//defining and starting the physics engine
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

//defining the sprites 
var rope,rope1;
var airBlower;
var div1,div2,div3,div4,div5,div6;
var vaccine,vaccineimg,water,waterimg,food,foodimg,fire,fireimg;
var corana1,corana2,corana3,corana4,corana5,corana6,corana7,corana8,corana9,corana10,corana11,corana12,coranaimg;
var bg_img,fruit,fruit_con;
var button;
var wood,woodimg;
var score = 0;
var back;

//loading the animations

function preload(){
  fireimg = loadAnimation("fire1.png","fire2.png","fire3.png","fire4.png");
  vaccineimg = loadImage("vaccine.png");
  waterimg = loadAnimation("ocean1.png","ocean2.png","ocean3.png","ocean4.png");
  foodimg = loadImage("Food.png");
  coranaimg = loadAnimation("virus.png");
  bg_img = loadImage("background.png");
  woodimg = loadImage("log.png");
  
}
//setting up the game 
function setup() {
  createCanvas(700,800);

  engine = Engine.create();
  world = engine.world;

  rope = new Rope(7,{x:350,y:60});

  var div ={
    isStatic:true
  }

  div1 = Matter.Bodies.rectangle(140,450,4,50,div);
  World.add(world,div1);
  div2 = Matter.Bodies.rectangle(280,450,4,50,div);
  World.add(world,div2);
  div3 = Matter.Bodies.rectangle(420,450,4,50,div);
  World.add(world,div3);
  div4 = Matter.Bodies.rectangle(560,450,4,50,div);
  World.add(world,div4);
  div6 = createSprite(350,650,700,4);

  fire = createSprite(210,500);
  fire.addAnimation('fire',fireimg);

  food = createSprite(490,580);
  food.addImage(foodimg);
  food.scale = 0.27

  water = createSprite(340,590);
  water.addAnimation('water',waterimg);
  water.scale = 1.3;

  corana1 = createSprite(70,550);
  corana1.addAnimation('corona',coranaimg);
  corana1.scale = 0.1;

  corana2 = createSprite(100,600);
  corana2.addAnimation('corona',coranaimg);
  corana2.scale = 0.1;

  corana3 = createSprite(50,620);
  corana3.addAnimation('corona',coranaimg);
  corana3.scale = 0.1;

  corana4 = createSprite(60,580);
  corana4.addAnimation('corona',coranaimg);
  corana4.scale = 0.1;

  corana5 = createSprite(30,550);
  corana5.addAnimation('corona',coranaimg);
  corana5.scale = 0.1;

  corana6 = createSprite(100,550);
  corana6.addAnimation('corona',coranaimg);
  corana6.scale = 0.1;

  corana7 = createSprite(95,570);
  corana7.addAnimation('corona',coranaimg);
  corana7.scale = 0.1;

  corana8 = createSprite(80,570);
  corana8.addAnimation('corona',coranaimg);
  corana8.scale = 0.1;

  corana9 = createSprite(55,600);
  corana9.addAnimation('corona',coranaimg);
  corana9.scale = 0.1;

  corana10 = createSprite(35,570);
  corana10.addAnimation('corona',coranaimg);
  corana10.scale = 0.1;

  corana11 = createSprite(80,600);
  corana11.addAnimation('corona',coranaimg);
  corana11.scale = 0.1;

  corana12 = createSprite(30,600);
  corana12.addAnimation('corona',coranaimg);
  corana12.scale = 0.1;

  vaccine = createSprite(630,585);
  vaccine.addImage(vaccineimg);
  vaccine.scale = 0.3; 

  fruit = Bodies.circle(350,350,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  airBlower = createImg('balloon.png');
  airBlower.position(50,200);
  airBlower.size(120,120);
  airBlower.mouseClicked(airblow);

  button = createImg('cut_btn.png');
  button.position(330,60);
  button.size(50,50);
  button.mouseClicked(drop);


  
  

}


function draw() 
{
  background(0);
  image(bg_img,0,0,width,height);

  

  Engine.update(engine);
  rope.show();
  

  fill("yellow");
  textSize(30);
  text("-100",30,685);
  text("-50",185,685);
  text("0",340,685);
  text("+50",465,685);
  text("+100",600,685);

  ellipse(fruit.position.x,fruit.position.y,40);
  rect(div1.position.x,div1.position.y,4,400);
  rect(div2.position.x,div2.position.y,4,400);
  rect(div3.position.x,div3.position.y,4,400);
  rect(div4.position.x,div4.position.y,4,400);


  if(collide(fruit,vaccine,80)==true){
    score = score+100;
    vaccinated();
    Matter.Body.remove(fruit.body);
  }
  if(collide(fruit,water,80)==true){
    damped();
    Matter.Body.remove(fruit.body);
  }
  if(collide(fruit,food,80)==true){
    score = score+50
    ate();
    Matter.Body.remove(fruit.body);
  }
  if(collide(fruit,fire,80)==true){
    score = score-50
    burned();
    Matter.Body.remove(fruit);
  }
  if(collide(fruit,corana1,80)==true){
    score = score-100
    diseased();
    Matter.World.remove(fruit);
  }
  


  

  
  drawSprites();

}
function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  
}
function drop()
{
  
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 

  



}
function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}
function vaccinated(){
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!! You are Vaccinated!!",
      imageUrl:
        "https://github.com/Vrukshav/images/blob/main/vaccine.png?raw=true",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

  
}
function ate(){
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!! I hope you had a nice meal!!",
      imageUrl:
        "https://github.com/Vrukshav/images/blob/main/Food.png?raw=true",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

  
}
function damped(){
  
    swal(
      {
        title: `Game Over!!!`,
        text: "Thanks for playing!! Oops! You got wet!!",
        imageUrl:
          "https://github.com/Vrukshav/images/blob/main/Ocean.jpg?raw=true",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  
    
  
}
function burned(){
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!! You got burned by fire!!",
      imageUrl:
        "https://github.com/Vrukshav/images/blob/main/fire.png?raw=true",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

  
}
function diseased(){
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!! You are diseased by CoronaVirus!!",
      imageUrl:
        "https://github.com/Vrukshav/images/blob/main/virus.png?raw=true",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

  
}