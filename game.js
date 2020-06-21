var soundlast = window.localStorage.getItem('sound');
const canvas = document.getElementById("canvas");
const contextv = canvas.getContext("2d");
const canvasSize = 600;

canvas.width = canvasSize;
canvas.height = canvasSize;

const snakeBox = 20;
const totalMoves = canvasSize/snakeBox;

const apple = new Image();
apple.src = "image/frog.png"
let yesSound = true;

//Declare audio here
let dead = new Audio();
let eat = new Audio();
let move = new Audio();
let login = new Audio();
if(soundlast == "🔊" || soundlast =="🔇"){
    if(soundlast == "🔊"){
        dead.src="audio/dead.mp3";
        eat.src="audio/eat.mp3";
        move.src="audio/move.mp3";
        login.src="audio/login.mp3";
    }else{
        dead.src="audio/noaudio.mp3";
        eat.src="audio/noaudio.mp3";
        move.src="audio/noaudio.mp3";
        login.src="audio/noaudio.mp3";
    }
    document.getElementById("mut").value = soundlast;
}else{  
    window.localStorage.setItem('sound', document.getElementById("mut").value);
    soundlast = window.localStorage.getItem('sound');
}
//define snake

let snake =[];
snake[0] = {
    x : 9*snakeBox,
    y : 10*snakeBox
};

//create food

let food ={};
getFood();
//score

let score = 0;

//snake directions
let dir = ""
//-------------------//
document.addEventListener("keydown", handleKeyInit);
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);


var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            handleKey("ml");
        } else {
            handleKey("mr");
        }                       
    } else {
        if ( yDiff > 0 ) {
            handleKey("mu");
        } else { 
            handleKey("md");
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
//-------------------//
function handleKeyInit(){
    handleKey("kb");
}

function handleKey(ValueMK = ""){
    let key
    if(ValueMK == "kb"){
        key = event.keyCode;    
    }else{
        key = ValueMK == "ml"? 37 : ValueMK == "mr"? 39 : ValueMK == "mu"? 38 : 40 ;
    }
    if (key ==37 && dir!="Right" && yesSound){
        dir = "Left";
        move.play();
    }else if(key ==38 && dir!="Down" && yesSound){
        dir = "Up";
        move.play();       
    }else if(key ==39 && dir!="Left" && yesSound){
        dir = "Right";
        move.play();       
    }else if(key ==40  && dir!="Up" && yesSound){
        dir = "Down"; 
        move.play();      
    }

}

function getFood(){
 food ={
     x: Math.floor(Math.random()*(totalMoves-2-3)+ 3)*snakeBox,
     y: Math.floor(Math.random()*(totalMoves-2-3)+ 3)*snakeBox  
 }
    checkfood(snake,food);
}

function checkfood(sna,foop){
    for(var i =0; i<sna.length; ++i){
        if(sna[i].x == foop.x && sna[i].y == foop.y){
            getFood();
        }
    }
     return;
}

function collit(head, sar){
    for(var i =0; i<sar.length; ++i){
        if(sar[i].x == head.x && sar[i].y == head.y){
            return true;
        }
    }
     return false;
}



function finalrender(){
     contextv.fillStyle = "#dcdcdc";
    contextv.fillRect(0,0,canvasSize,canvasSize);

    for(let i=0; i<snake.length;i++){
        contextv.fillStyle = i==0?"#4caf50":"#ffffff";
        contextv.fillRect(snake[i].x,snake[i].y,snakeBox,snakeBox); 

        contextv.strokeStyle = "E91E63";
        contextv.strokeRect(snake[i].x,snake[i].y,snakeBox,snakeBox);
    }

    contextv.drawImage(apple,food.x,food.y,snakeBox,snakeBox);
    
    let snakeX=snake[0].x;
    let snakeY=snake[0].y;

    if(dir=="Left") snakeX-=snakeBox;
    if(dir=="Right") snakeX+=snakeBox;
    if(dir=="Up") snakeY-=snakeBox;
    if(dir=="Down") snakeY+=snakeBox;

    //if snake eats food
    if(snakeX == food.x && snakeY==food.y){
        score++;
        getFood();
        eat.play();
    }else{
        snake.pop();
    }

    let newHead = {
        x : snakeX,
        y :  snakeY   
    }

    if(snakeX<0 || snakeX>=canvasSize || snakeY<0 || snakeY >= canvasSize || collit(newHead,snake)){
        gameOver();
        return;
    }

    snake.unshift(newHead);

    contextv.fillStyle = "black";
    contextv.font = "40px Arial";
    contextv.fillText(score,10,40);

}

finalrender();

var gm = setInterval(finalrender,120);  

function gameOver(){
    clearInterval(gm);
    dead.play();
    yesSound = false;
    contextv.fillStyle ="white";
    contextv.fillRect(canvasSize/2-300,canvasSize/2-60,canvasSize,100)
    contextv.fillStyle ="black";
    contextv.font = "60px";
    contextv.fillText("Game Over | Score : "+score ,canvasSize/2-210,canvasSize/2);
    document.getElementById("relo").style.visibility="visible";
    
}

function mute(){
    if(soundlast == "🔇"){
        dead.src="audio/dead.mp3";
        eat.src="audio/eat.mp3";
        move.src="audio/move.mp3";
        login.src="audio/login.mp3";
        document.getElementById("mut").value = "🔊";
        soundlast = "🔊";
        window.localStorage.setItem('sound', document.getElementById("mut").value);
    }
    else{
        dead.src="";
        eat.src="";
        move.src="";
        login.src="";
        document.getElementById("mut").value = "🔇";
        soundlast = "🔇";
        window.localStorage.setItem('sound', document.getElementById("mut").value);
    }
}
