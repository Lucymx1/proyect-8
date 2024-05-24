var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----


var playerMallet;

var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("yellow");

var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("yellow");

//variable para almacenar diferentes estados del juego
var gameState = "serve";


// hacer la cancha
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";

var gameState ="serve";

// crear objetos y asignarles colores
var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";

// variables de puntuación
var playerScore = 0;
var compScore = 0;

function draw() {
  
  // despejar la pantalla
  background("green");

       // mostrar las variables compScore  y playerScore
  textSize(18);
  fill("maroon");
  text("compScore " + compScore, 25, 225);
  text("playerScore " + playerScore, 25, 185);
  

   if(gameState=="serve")
  {
         //mostrar texto
      textSize(18);
      fill ("maroon");
      //Agregar el texto “Presiona espacio para golpear” 
      text("Presiona la barra espaciadora para atacar",32,120);
      
      //servir el delantero cuando se presiona la barra espaciadora
      if (keyDown("space")) {
        
        serve();
        //cambiar el estado del juego
         gameState="play";
      }
  }
  
  
    if(gameState == "play")
 {
     
  //servir al delantero cuando se presiona la barra espaciadora
  if (keyDown("space")) {
    serve();
  }
  
    // puntuación
  
     if(striker.isTouching(goal1))
      { // incrementar la puntuación del jugador
        compScore = compScore+1 ;
        //mostrar la cuadrícula para identificar el valor de x e y para mover al delantero al centro
        striker.x=200;
        striker.y=200;
        striker.velocityX=0;
        striker.velocityY=0;
      }
      
      if(striker.isTouching(goal2))
      {
        playerScore = playerScore + 1;
        // Reiniciar al delantero al agregar el valor central de x e y 
        striker.x=200;
        striker.y=200;
        striker.velocityX=0;
        striker.velocityY=0;
      }
      
        if(playerScore==5 || compScore==5)//agregar la condición para comprobar si la puntuación de un jugador llega a 5
     {
       gameState= "end";
      }
 }
       //agregar la condición para comprobar si la puntuación de un jugador llega a 5
if (gameState == "end")
      {
        fill("maroon");
        textSize(18);
        //agregar el texto de fin del juego
        text(" Game Over ¡Fin del Juego!",170,160);
      }
        
  
  //make the player paddle move with the Arrow keys
  paddleMovement();
  
  
  //IA para la paleta de la computadora
  //hacer que se mueva con la posición y del delantero
  computerMallet.x = striker.x;

  
  //dibujar la línea al centro
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //crear límites de bordes
  //hacer que el delantero rebote con el borde superior e inferior
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);

 
 
  drawSprites();
}

 

function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
