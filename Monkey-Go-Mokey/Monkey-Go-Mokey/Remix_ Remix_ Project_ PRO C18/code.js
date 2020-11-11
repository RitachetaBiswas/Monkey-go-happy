var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b","70b5e46a-3182-4c1c-95c0-cdb3750a8a46"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":4,"version":"XYMIgn3b7iSDJsqxzrBhFumqLIrpmbmH","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"eH8nnurPJ1HdJUHY.CkXrP._wQjl_xxc","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"GNoUMzFXOSRFQvb8SFoxZ3i2JVuP9T8g","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"},"70b5e46a-3182-4c1c-95c0-cdb3750a8a46":{"name":"Jungle","sourceUrl":"assets/v3/animations/_DPfzZrF7q6tpZtX1MOx8APvMVozdR8GFnAD2wCGgEs/70b5e46a-3182-4c1c-95c0-cdb3750a8a46.png","frameSize":{"x":1003,"y":771},"frameCount":1,"looping":true,"frameDelay":4,"version":"1WikR_9nXblfROldeICrn6NoH1rhdpyy","loadedFromSource":true,"saved":true,"sourceSize":{"x":1003,"y":771},"rootRelativePath":"assets/v3/animations/_DPfzZrF7q6tpZtX1MOx8APvMVozdR8GFnAD2wCGgEs/70b5e46a-3182-4c1c-95c0-cdb3750a8a46.png"}}};
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

var ground2=createSprite(200,140,1,1);
ground2.setAnimation("Jungle");

ground2.velocityX=-4;
ground2.x=ground2.width/2;

//create player and ground sprite
 var player = createSprite(100,340,20,50);
  player.setAnimation("monkey");
  player.scale=0.1;
 
 


// create group
var BananaGroup=createGroup();
var ObstacleGroup=createGroup();

var score=0;

function draw() {
  
  background(255);
  //add gravity
  player.velocityY=player.velocityY+0.8;
  createEdgeSprites();
  player.collide(bottomEdge);
  
  // make player jump
    
    if(keyDown("space")&&player.y>=310){ 
      player.velocityY=-15;
    playSound("assets/category_jump/arcade_game_jump_11.mp3");
      
    }

  //move ground2
  if(ground2.x<0){
     ground2.x=ground2.width/2;
  }
  
    
    
      if(player.isTouching(BananaGroup)){
         score=score+2;
         BananaGroup.destroyEach;
         player.scale += 0.001;
          player.scale=player.scale+0.01;
         playSound("assets/category_collect/clicky_crunch.mp3");
         BananaGroup.destroyEach();
       }
       if(player.isTouching(ObstacleGroup))
       {
         player.scale -= 0.001;
         ObstacleGroup.destroyEach();
       }
       
        
    banana();
    obstacle();
  
  drawSprites();
  
  stroke("black");
textSize(20);
fill("black");
text("Score:"+score,100,50);
  
}


function banana() {
  
  if(World.frameCount%80===0){
   var Banana = createSprite(400,320,10,10);
   Banana.y=randomNumber(120,200);
   Banana.setAnimation("Banana");
   Banana.scale=0.05;
   Banana.velocityX=-6;
   Banana.lifetime=80;
   BananaGroup.add(Banana);
  
}
}
function obstacle(){
  
  if(World.frameCount%300===0){
    
    var obstacles=createSprite(400,380,10,10);
    obstacles.setAnimation("Stone");
    obstacles.lifetime=80;
    obstacles.scale=0.15;
    obstacles.velocityX=-8;
    ObstacleGroup.add(obstacles); 
    
    
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
