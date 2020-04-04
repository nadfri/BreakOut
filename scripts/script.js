/******************Declaration of Global Variables**********************/
class Shape
{
    constructor (posX,posY,l,h,radius,color)
    {
        this.posX = posX;		
        this.posY = posY;
        this.l = l;
        this.h = h;
        this.radius = radius;
        this.color  = color;
        this.stroke = "#282828";
    }

    drawCircle()
    {
        ctx.beginPath();
        ctx.arc(this.posX,this.posY,this.radius,0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "maroon";
        ctx.stroke();
    }

    drawRect()
    {
        ctx.beginPath();
        ctx.rect(this.posX,this.posY,this.l,this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.stroke;
        ctx.stroke();
    }
}

const myCanvas = document.getElementById("myCanvas");
const canvasH  = myCanvas.height = 500;
const canvasW  = myCanvas.width  = 700;
const ctx      = myCanvas.getContext("2d");

let paddleRight   = false;
let paddleLeft    = false;
let stopAnimation = false;
let beginGame     = false; //to avoid space bar function
let move;                  // allow brick moving
let scrollY       = false;

let music         = new Audio("sounds/tetris.mp3");
let soundActive;

/*****************************Start of onload***************************/
window.onload = () =>{
    "use strict";

    /******************************Audios******************************/
    const gameover  = new Audio("sounds/gameover.mp3");
    const broken    = new Audio("sounds/broken.wav");
    const win       = new Audio("sounds/win.mp3");
    const lost      = new Audio("sounds/lost.mp3");
    const extraLife = new Audio("sounds/extraLife.mp3");
    const launch    = new Audio("sounds/launch.mp3");
    const finalflash= new Audio("sounds/finalflash.mp3");
    const rasengan  = new Audio("sounds/rasengan.mp3");
    const bigger    = new Audio("sounds/bigger.mp3");
    const smaller   = new Audio("sounds/smaller.mp3");
    const ballSmall = new Audio("sounds/ballSmall.mp3");
    const random    = new Audio("sounds/random.mp3");

    const tabAudio  = [music,gameover,broken,win,lost,extraLife,
                       launch,rasengan,bigger,smaller,ballSmall,random];
    
    /****************Declaration of Local Variables********************/
    const paddle = new Shape(0,0,120,20,0,"blue"); // x,y, width,high,*,color
    paddle.posX  = (canvasW - paddle.l)/2;
    paddle.posY  =  canvasH - paddle.h;
    let paddleSpeed = 10;

    let sizeBall = 7;
    const ball   = new Shape(0,0,0,0,sizeBall,"red"); //x,y,**,**,radius,color
    
    let gravity;
    let sens;
    let count;
    let life = 3;
    let tabBricks = [];

    /*01*/heartUpdate();
    /*02*/speakerControl();
    /*03*/launchGame();
    /*04*/createBricks(tabBricks); //Creation of bricks, see script level_xx
    /*05*/requestAnimationFrame(motion); //Animation of shape
    
    function motion() //all frame updating here
    {
        ctx.clearRect(0, 0, canvasW, canvasH); //clear canvas
        ball.drawCircle(); //draw ball
        paddle.drawRect(); //draw paddle
        count = nLine*nCol;//number of bricks

  /*01*/init(); //init before to play
  /*02*/paddleControl();
  /*03*/updateNumberOfBricks();
  /*04*/updateDrawBricks();
  /*05*/detectWallCollision();
  /*06*/detectPaddleCollision();
  /*07*/detectBrickCollision();
  /*08*/scrollBricks();
  /*09*/updateAnimation();
  /*10*/winOrLose();

        if(move !== undefined) for(let line of tabBricks) for (let brick of line) moveBricks(brick);

    }

    
/*******************Animation Updating*************************************/
function updateAnimation()
{
    ball.posY += gravity
    ball.posX += sens;
    if (!stopAnimation) requestAnimationFrame(motion); // Freeze animation
}

/*******************Function Launch Game *************************************/
function launchGame()
{
    document.onkeypress = (e) =>
    {
        if(e.key == " " && beginGame == false) //launch by press bar space
        {
            beginGame        = true;
            sens    		 = 2.5;
            gravity 		 = 4;
            music.loop       = true;
            scrollY          = true;
            info.textContent = "";
            music.play();
        }

        if(e.key == "Enter") document.location = "./index.html";//press enter to go to menu
        if(e.keyCode == 112 ) gamePause(); //Game paused by press on "p"
    };
}

/*******************Function initialize*******************************/
function init()
{
    if(beginGame == false)
    {
        ball.posX = paddle.posX+paddle.l/2;
        ball.posY = paddle.posY-ball.radius;
        gravity = 0;
        sens    = 0;
        info.textContent = "Press Space Bar to launch the Ball";
    }
}

/***********************************Display of life***************/
function heartUpdate()
{
    heart.textContent = "";
    for (let i=0; i<life; i++) heart.textContent += "❤️";
}

/***********************************Function Losing a life***************/
function losingLife()
{
    lost.play();
    life--;
    heartUpdate();

    beginGame = false;
    init();
}

/***********************************Draw message**************************/
function drawMessage(text,posX)
{
    ctx.beginPath();
    ctx.rect(0,canvasH/2-40,canvasW,100);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "red";
    ctx.stroke();

    ctx.fillStyle = "blue";
    ctx.font = "70px orbitron";
    ctx.fillText(text,posX,canvasH/2+30);
    ctx.strokeStyle = "red";
    ctx.strokeText(text,posX,canvasH/2+30);
}

/***********************************Function Win/Lose****************************/
function winOrLose()
{        
    if (count == 0)  victory();
    if (life  == 0)  gameOver();
}

function gameOver()
{
    drawMessage("GAME OVER", 100);
    music.pause();
    gameover.play();
    stopAnimation = true;
    info.textContent = "Press Space Bar to play again";

    document.onkeypress = (e) => {
        if(e.key == " ") document.location.reload();
        else if (e.key == "Enter") document.location = "./index.html";
    };
}

function victory()
{
    drawMessage("VICTORY!", 150);   
    music.pause();
    win.play();
    stopAnimation = true;	

    setInterval( ()=>{info.textContent = "Press Space Bar to unlock the Next Level";}
    ,1000); //TODO: clear all setTimeOut()

    unlockNextLevel();
}

/*******************************Function PAUSE********************* */
function gamePause()
{
    if(stopAnimation == false)
    {
        info.textContent = "***GAME IS PAUSED***";
        music.pause();          
        stopAnimation = true;
    }

    else 
    {
        music.play();
        stopAnimation = false;
        requestAnimationFrame(motion); 
    }         
}   

/***************Sound Control****************************************/
function speakerControl()
{
    speaker.onclick = () =>{mute();}

    let getStorage  = localStorage.getItem('saveMute'); //verify if data in storage
    soundActive = (getStorage != null)? getStorage : 1;

    if(soundActive == 0)
    {
        soundActive = 1;
        mute();
    }
}

function mute()
{
    if(soundActive == 1)
    {
        soundActive = 0;
        speaker.textContent = "🔈";
        for (let audio of tabAudio) audio.muted = true;
    }

    else
    {
        soundActive = 1;
        speaker.textContent = "🔊";
        for (let audio of tabAudio) audio.muted = false;
    }

    localStorage.setItem("saveMute", soundActive); //save data sound
}

/********************************Motion Paddle***************************************/
function paddleControl()
{
    document.onkeydown = (e) =>{
        if(e.key == "ArrowRight") paddleRight = true; 
        if(e.key == "ArrowLeft" ) paddleLeft  = true;
    };

    document.onkeyup = (e) =>{
        if(e.key == "ArrowRight") paddleRight = false;
        if(e.key == "ArrowLeft" ) paddleLeft  = false;
    };
    
    if(paddleRight && paddle.posX < canvasW-paddle.l) paddle.posX+= paddleSpeed;
    if(paddleLeft  && paddle.posX > 0)                paddle.posX-= paddleSpeed; 

}

/************************Functions to draw Bricks*********************/
function updateNumberOfBricks()
{
    for(let line of tabBricks) //Count of bricks destroyed
        for (let brick of line) if (brick.status == 0) count--;
}

function updateDrawBricks()
{       
    for(let line of tabBricks)  //Draw rest of bricks
        for (let brick of line)
            if (brick.status > 0 && count > 1)
                brick.drawRect();
            
            else if (brick.status > 0 && count == 1) //last brick bigger
            {
                brick.l = 125;
                brick.color = "green";
                brick.drawRect();
            }
}

function scrollBricks()
{ 
    if(move !=undefined) //scroll of bricks
    {            
        for(let line of tabBricks) 
            for (let brick of line)
            {
                if (brick.posY + brick.h >= canvasH - paddle.h && brick.status>0) //ground
                {
                    gravityBrick = -gravityBrick;
                    losingLife();
                    break;
                }
        
                if (brick.posY <= 0 && brick.status !=0) //roof
                {
                    gravityBrick = -gravityBrick;
                    break;
                }

                if (brick.posX <= 0 && brick.status !=0) //left side
                {   
                    sensBrick = -sensBrick;
                    break;
                } 

                if (brick.posX + brick.l >= canvasW && brick.status !=0) //right
                {   
                    sensBrick = -sensBrick;
                    break;
                }
            }
    }
}

function moveBricks(brick)
{
    brick.posX += sensBrick;
    if(scrollY == true)
    brick.posY -= gravityBrick;
}

/********************************Wall Collision************************************/
function detectWallCollision()
{
    if(ball.posY + ball.radius >= canvasH) losingLife();//Game lost

    if(ball.posY - ball.radius <= 0) //roof
    {
        gravity   = -gravity; 
        ball.posY = ball.radius +1;
    }

    if(ball.posX - ball.radius <= 0 ) //wall left
    {	
        sens      = -sens; 
        ball.posX = ball.radius +1;
    }

    if(ball.posX + ball.radius >= canvasW) //wall right
    {
        sens      = -sens;
        ball.posX = canvasW - ball.radius -1;
    }
}


/********************************Paddle Collision******************************************/
function detectPaddleCollision()
{
    if(ball.posX > paddle.posX 
    && ball.posX < paddle.posX + paddle.l) //ball between paddle limits in X
        if(ball.posY + ball.radius >= paddle.posY 
        && ball.posY < canvasH) //ball between paddle limitis in Y
        {
            gravity   = -gravity;
            ball.posY = paddle.posY - ball.radius -1 //out ball from paddle

            if(paddleRight) sens = +Math.abs(sens); 	//change sens of ball
            if(paddleLeft)  sens = -Math.abs(sens); 
        }
    //******************************Paddle Corner Collision*************************************/
    if(paddle.posY >= ball.posY 
    && paddle.posY <= ball.posY + ball.radius) //ball in Top Corner	

        if(paddle.posX  >= ball.posX
        && paddle.posX  <= ball.posX + ball.radius) //Left Corner
        {
            gravity = -Math.abs(gravity);
            sens    = (sens>0)? -sens : sens;
        }

    else if(paddle.posX + paddle.l >= ball.posX - ball.radius
        && paddle.posX + paddle.l <= ball.posX) //Right Corner
        {
            gravity = -Math.abs(gravity);
            sens    = (sens<0)? -sens : sens;
        }
}

/*********************************Brick Collision*******************************************/
function brickStatusUpdate(brick,_sens,_gravity)
{
    broken.play();
    brick.status--;
    if (brick.status == 2) brick.color = "rgba(255,165,0,0.5)";
    if (brick.status == 1) brick.color = "orange";
    
    sens    = _sens;
    gravity = _gravity
    power(brick);
}

function detectBrickCollision()
{
    let marge = 7; //marge of precision ball collision
    for (let line of tabBricks)
        for (let brick of line)
        {	
            //********************Brick Horizontal Side*************************************/
            if(ball.posX    > brick.posX 
            && ball.posX    < brick.posX + brick.l 
            && brick.status > 0) //ball between brick
            {
                if(ball.posY - ball.radius <= brick.posY + brick.h 
                && ball.posY - ball.radius >= brick.posY + brick.h - marge) //bottom side
                    {brickStatusUpdate(brick,sens,-gravity);}

                if(ball.posY + ball.radius > brick.posY
                && ball.posY + ball.radius < brick.posY + marge) //top side
                    {brickStatusUpdate(brick,sens,-gravity);}
            }
            //****************Brick Corner Bottom******************************************/
            if(brick.posY + brick.h >= ball.posY - ball.radius
            && brick.posY + brick.h <= ball.posY && brick.status > 0) 

                if(brick.posX >= ball.posX
                && brick.posX <= ball.posX + ball.radius) //left Bottom
                {
                    brickStatusUpdate(brick,sens,-gravity);
                    //gravity = Math.abs(gravity);
                    //sens    = (sens>0)? -sens : sens;
                }
            
           else if(brick.posX + brick.l >= ball.posX - ball.radius
                && brick.posX + brick.l <= ball.posX) //Right Bottom
                {
                    brickStatusUpdate(brick,sens,-gravity);
                    //gravity = Math.abs(gravity);
                    //sens    = (sens<0)? -sens : sens;
                }
                
            //******************Brick Corner Top*********************************************/
            if(brick.posY >= ball.posY 
            && brick.posY <= ball.posY + ball.radius && brick.status > 0) //ball in Top Corner

                if(brick.posX  >= ball.posX
                && brick.posX  <= ball.posX + ball.radius) //Left Top
                {
                    brickStatusUpdate(brick,sens,-gravity);                
                    //gravity = -Math.abs(gravity);
                    //sens    = (sens>0)? -sens : sens;
                }
                
           else if(brick.posX + brick.l >= ball.posX - ball.radius
                && brick.posX + brick.l <= ball.posX) //Right Top
                {
                    brickStatusUpdate(brick,sens,-gravity);                  
                    //gravity = -Math.abs(gravity);
                    //sens    = (sens<0)? -sens : sens;
                } 

            //***************Brick Vertical Sides*******************************************/
            if(ball.posY > brick.posY 
            && ball.posY < brick.posY + brick.h && brick.status > 0) //ball between brick.h
            {
                if(ball.posX + ball.radius >= brick.posX 
                && ball.posX + ball.radius < brick.posX +marge) //left brick side
                    {brickStatusUpdate(brick,-sens,gravity);}

                if(ball.posX - ball.radius <= brick.posX + brick.l 
                && ball.posX - ball.radius >  brick.posX + brick.l-marge) //right side
                    {brickStatusUpdate(brick,-sens,gravity);}
            } 
        }
}

/************************************Function Bricks Powers***********************/
function resetPower()
{
    if(paddle.color != "yellow" || paddle.color != "dimGray")
      {paddle.color  = "blue";}

    paddleSpeed        = 10;
    ball.color         = "red";
    ball.radius        = sizeBall; 
    info.textContent   = "";
    music.playbackRate = 1;
    sens    = (sens>=0)? 2.5 : -2.5;
    gravity = (gravity>=0)?  4 : -4;
}

function power(item)
{ 
    if(item.color == "firebrick")
    {
        sens = (sens>=0)? 8 : -8; //ball faster
        music.playbackRate = 1.4;
        ball.color = "firebrick";
        info.textContent = "Faster!!!";
        setTimeout(()=>{resetPower()},5000);
    }

    if(item.color == "snow")
    {	
        sens    = (sens>=0)?  1.5 : -1.5; //ball slower
        gravity = (gravity>=0)?  2 : -2;
        music.playbackRate = 0.8;
        ball.color = "snow";
        info.textContent = "Slower!!!";
        setTimeout(()=>{resetPower()},5000);
    }
    
    if(item.color == "chartreuse") //random sens
    {
        sens    = 0;
        gravity = 1;
        ball.color = "paleGreen";
        info.textContent= "Hey ball! what are you doing?";

        setTimeout( ()=>{
            random.play();
            sens    = (Math.random()*6+1)*Math.pow(-1,Math.random().toFixed(1)*10);
            gravity = 4;
            ball.color = "red";
            info.textContent= "";
        },1000);
    }

    if(item.color == "yellow") //paddle bigger
    {
        bigger.play();
        paddle.l += 20; 
        paddle.color = "yellow";
        info.textContent = "Yeah, paddle is bigger!";
    }
    
    if(item.color == "dimGray") //paddle smaller
    {
        smaller.play();
        paddle.l-=20;
        paddle.color = "dimGray";
        info.textContent = "What!!!, paddle is smaller!";
    }

    if(item.color == "burlyWood") //paddle speed lower
    {
        paddleSpeed  = 5;
        paddle.color = "burlyWood";
        info.textContent = "Nooo! Paddle is slower!";
        setTimeout(()=>{resetPower()},5000);
    }
    
    if(item.color == "purple") //paddle speed faster
    {
        paddleSpeed  = 15;
        paddle.color = "purple";
        info.textContent = "Paddle is faster!";
        setTimeout(()=>{resetPower()},5000);
    }

    if(item.color == "darkGreen") //ball bigger
    {
        ball.radius = 20; 
        ball.color  = "darkGreen";
        info.textContent = "What's that? a big ball?!";
        setTimeout(()=>{resetPower()},5000);
    }

    if(item.color == "black") //ball smaller
    {
        ballSmall.play();
        ball.radius = 4; 
        ball.color  = "black";
        info.textContent = "What's that? a small ball?!";
        setTimeout(()=>{resetPower()},5000);
    }

    if(item.color == "hotpink") //Extra Life
    {
        life++;
        heartUpdate();
        info.textContent = "Yeah! Extra Life!";
        extraLife.play();
        setTimeout(()=>{resetPower()},2000);
    }

    if(item.color == "powderBlue") //Ball on paddle
    {
        launch.play();
        info.textContent = "Yeah! The ball on me!";
        ball.color   = "white";
        paddle.color = "powderBlue";

        beginGame = false;
        init();
        document.body.onkeyup = (e)=>
        {if(e.key == " ") resetPower();};
    }

    if(item.color == "red") //Extra Giant Ball
    {
        init();

        finalflash.play();
        info.textContent = "Final Flash!!!";
        ball.color   = "gold";
        paddle.color = "red";
        paddle.l    += 20;
        const interval = setInterval(()=>{
            ball.radius+=1;
            if(ball.radius >= 230) clearInterval(interval);   
        },10);
    }

    if(item.color == "cyan") //Extra Ball
    {
        rasengan.play();
        info.textContent = "Rasen Gan!!!";
        ball.color = "cyan";
        paddle.color = "red";
        const interval = setInterval(()=>{
            ball.radius+=1;
            sens    = 0;
            gravity = 0;
            if(ball.radius >= 70) clearInterval(interval);   
        },10);
        setTimeout(()=>{resetPower()},1500);
    }

    if(item.color == "thistle") //change Scroll
    {
        info.textContent = "Stop the Scroll, please!";
        gravityBrick = -gravityBrick;
        setTimeout(()=>{info.textContent = "";},3000);
    }
    
}





    /*****************************End of onload**********************/
    }