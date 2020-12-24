class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
      playerCount = playerCountRef.val();
      player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
  form.hide();
  textSize(35);
  text("Game Starts", 120 , 100)
  Player.getPlayerinfo();
   if(allPlayers !== undefined ){
   var position = 130;
  for(var i in allPlayers){
    if(i === "player" + player.index){
     fill("red") 
    }
    else{
    fill("black");
    }
    position += 20;
    textSize(25);
    stroke("blue")
    text(allPlayers[i].name  +  ":" + allPlayers[i].distance , 120 , position);
  }

   }
if(keyIsDown(UP_ARROW) && player.index !== null){
  player.distance += 50;
  player.update();
}


  }
}
