/******************Declaration of Global Variables**********************/

/************************Class Shape*******************************/
class Shape
{
    constructor (posX,posY,l,h,radius,color)
    {
        this.posX = posX;		
        this.posY = posY;
        this.l = l;
        this.h = h;
        this.radius = radius;
        this.color = color;
        this.stroke = "#282828";
    }

    drawCircle()
    {
        ctx.beginPath();
        ctx.arc(this.posX,this.posY,this.radius,0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
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

    control()
    {
        document.onkeydown = (e) =>{
             if     (e.key == "ArrowRight") right = true; 
             else if(e.key == "ArrowLeft" ) left  = true;
        };

        document.onkeyup = (e) =>{
            if     (e.key == "ArrowRight") right = false;
            else if(e.key == "ArrowLeft" ) left  = false;
           };
    }
}

let right         = false;
let left          = false;
let stopAnimation = false;
let beginGame     = false; //to avoid space bar function
let scrollY       = false;
let move;

const myCanvas = document.getElementById("myCanvas");
const canvasH  = myCanvas.height = 500;
const canvasW  = myCanvas.width  = 700;
const ctx      = myCanvas.getContext("2d");

let music     = new Audio("sounds/tetris.mp3");


/*****************************Start of onload***************************/
window.onload = () =>{
    "use strict";

    /******************************Audios******************************/
    
    const gameover  = new Audio("sounds/gameover.mp3");
    const broken    = new Audio("sounds/broken.wav");
    const victory   = new Audio("sounds/victory.mp3");
    const lost      = new Audio("sounds/lost.mp3");
    const extraLife = new Audio("sounds/extraLife.mp3");
    const launch    = new Audio("sounds/launch.mp3");
    const finalflash= new Audio("sounds/finalflash.mp3");
    const rasengan  = new Audio("sounds/rasengan.mp3");
    const bigger    = new Audio("sounds/bigger.mp3");
    const smaller   = new Audio("sounds/smaller.mp3");
    const ballSmall = new Audio("sounds/ballSmall.mp3");

    
    const tabAudio  = [music,gameover,broken,victory,lost,extraLife,
                       launch,rasengan,bigger,smaller,ballSmall];
    
    /****************Declaration of Local Variables********************/
    const paddle = new Shape(0,0,120,20,0,"blue");
    paddle.posX  = (canvasW - paddle.l)/2;
    paddle.posY  =  canvasH - paddle.h;
    let paddleSpeed = 10; paddle.control();
    
    let sizeBall = 7;
    const ball   = new Shape(0,0,0,0,sizeBall,"red"); //x,y,**,**,radius,color
    
    let gravity;
    let sens;
    let count;
    let life = 3;
    let tabBricks = [];

    /*******************Launch Game *************************************/
    document.onkeypress = (e) =>
    {
        if(e.key == " " && beginGame == false) //launch by press bar space
        {
            sens    		 = 2.5;
            gravity 		 = 4;
            music.loop       = true;
            beginGame        = true;
            scrollY          = true;
            info.textContent = "";
            music.play();
        }

        else if(e.key == "Enter") document.location = "./index.html";//press enter to go to menu


    };
    
    function init()
    {
        ball.posX = paddle.posX+paddle.l/2;
        ball.posY = paddle.posY-ball.radius;
        gravity = 0;
        sens    = 0;
        if(heart.textContent == "") heartUpadte();
    }
    
    function heartUpadte()
    {
        heart.textContent = "";
        for (let i=0; i<life; i++) 
        heart.textContent += "❤️";
    }

/************************************Creation of Bricks***************************/
    createBricks(tabBricks); // see script level_xx
    
    function motion()
    {
        /******************Draw Shape***************************************/
        ctx.clearRect(0, 0, canvasW, canvasH); //clear canvas
        ball.drawCircle();
        paddle.drawRect();
        count = nLine*nCol; //number of bricks

        if(beginGame == false) // init before to play
        {
            init();
        }

        for(let line of tabBricks)
            for (let brick of line)
                if (brick.status == 0)
                    count--;

        for(let line of tabBricks)
            for (let brick of line)
                if (brick.status > 0 && count > 1)
                    brick.drawRect();
                
                else if (brick.status > 0 && count == 1)
                {
                    brick.l = 125;
                    brick.color = "green";
                    brick.drawRect();
                }

            for(let line of tabBricks) //scroll Y bricks
                for (let brick of line)
                {
                    if (brick.posY + brick.h >= canvasH - paddle.h && brick.status>0)
                    {
                        gravityBrick = -gravityBrick;
                        life--;
                        beginGame = false;
                        heart.textContent = "";
                        lost.play();
                        init();
                        break;
                    }
            
                    else if (brick.posY <= 0 && brick.status !=0)
                    {
                        gravityBrick = -gravityBrick;
                        break;
                    }
            }
            
        
        
        if (count == 0)  drawVictory();
        if (life  == 0)  drawGameOver();
    
        /********************************Motion Paddle***************************************/
        if(right && paddle.posX < canvasW-paddle.l) paddle.posX+= paddleSpeed;
        if(left  && paddle.posX > 0)                paddle.posX-= paddleSpeed;
      
        /********************************Wall Collision************************************/
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
    
        if (ball.posY + ball.radius >= canvasH) //***Game lost***
        {
            life--;
            beginGame = false;
            heart.textContent = "";
            lost.play();
            init();
        }
    
        /********************************Paddle Collision******************************************/
        if(ball.posX > paddle.posX 
        && ball.posX < paddle.posX + paddle.l) //ball between paddle limits in X
            if(ball.posY + ball.radius >= paddle.posY 
            && ball.posY < canvasH) //ball between paddle limitis in Y
            {
                gravity   = -gravity;
                ball.posY = paddle.posY - ball.radius -1 //out ball from paddle
    
                if     (right) sens = +Math.abs(sens); 	
                else if(left)  sens = -Math.abs(sens); 
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
    
        /*********************************Brick Collision*******************************************/
        for (let line of tabBricks)
            for (let brick of line)
            {	
                let marge = 7;
        //********************************Brick Horizontal Side*************************************/
                if(ball.posX    > brick.posX 
                && ball.posX    < brick.posX + brick.l 
                && brick.status > 0) //ball between brick
                {
                    if(ball.posY - ball.radius <= brick.posY + brick.h 
                    && ball.posY - ball.radius >= brick.posY + brick.h - marge) //bottom side
                    {
                        brick.status--;
                        if (brick.status == 2) brick.color = "rgba(255,165,0,0.5)";
                        if (brick.status == 1) brick.color = "orange";

                        power(brick);
                        broken.play(); 	

                        gravity =- gravity;
                    }
    
    
                    if(ball.posY + ball.radius > brick.posY
                    && ball.posY + ball.radius < brick.posY + marge) //top side
                    {
                        brick.status--;
                        if (brick.status == 2) brick.color = "rgba(255,165,0,0.5)";
                        if (brick.status == 1) brick.color = "orange";

                        power(brick);
                        broken.play();	

                        gravity =- gravity;
                    }
                }
                //****************Brick Corner Bottom******************************************/
                if(brick.posY + brick.h >= ball.posY - ball.radius
                && brick.posY + brick.h <= ball.posY && brick.status > 0) 
    
                    if(brick.posX >= ball.posX
                    && brick.posX <= ball.posX + ball.radius) //left Bottom
                    {
                        brick.status--;
                        if (brick.status == 2) brick.color = "rgba(255,165,0,0.5)";
                        if (brick.status == 1) brick.color = "orange";

                        power(brick);
                        broken.play();

                        gravity = Math.abs(gravity);
                        sens    = (sens>0)? -sens : sens;
                    }
                
                //****************Brick Corner Right Bottoms*************************************/
                else if(brick.posX + brick.l >= ball.posX - ball.radius
                    && brick.posX + brick.l <= ball.posX) //Right Bottom
                    {
                        brick.status--;
                        if (brick.status == 2) brick.color = "rgba(255,165,0,0.5)";
                        if (brick.status == 1) brick.color = "orange";

                        power(brick);
                        broken.play();

                        gravity = Math.abs(gravity);
                        sens    = (sens<0)? -sens : sens;
                    }
                    
                //******************Brick Corner Top*********************************************/
                if(brick.posY >= ball.posY 
                && brick.posY <= ball.posY + ball.radius && brick.status > 0) //ball in Top Corner
    
                    if(brick.posX  >= ball.posX
                    && brick.posX  <= ball.posX + ball.radius) //Left Top
                    {
                        brick.status--;
                        if (brick.status == 2) brick.color = "rgba(255,165,0,0.5)";
                        if (brick.status == 1) brick.color = "orange";

                        power(brick);
                        broken.play();

                        gravity = -Math.abs(gravity);
                        sens    = (sens>0)? -sens : sens;
                    }
                    
                else if(brick.posX + brick.l >= ball.posX - ball.radius
                    && brick.posX + brick.l <= ball.posX) //Right Top
                    {
                        brick.status--;
                        if (brick.status == 2) brick.color = "rgba(255,165,0,0.5)";
                        if (brick.status == 1) brick.color = "orange";

                        power(brick);
                        broken.play();

                        gravity = -Math.abs(gravity);
                        sens    = (sens<0)? -sens : sens;
                    } 
    
                //***************Brick Vertical Sides*******************************************/
                if(ball.posY > brick.posY 
                && ball.posY < brick.posY + brick.h && brick.status > 0) //ball between brick.h
                {
                    if(ball.posX + ball.radius >= brick.posX 
                    && ball.posX + ball.radius < brick.posX +marge) //left brick side
                    {
                        brick.status--;
                        if (brick.status == 2) brick.color = "rgba(255,165,0,0.5)";
                        if (brick.status == 1) brick.color = "orange";

                        power(brick);
                        broken.play();

                        sens = -sens;
                    }
    
                    else if(ball.posX - ball.radius <= brick.posX + brick.l 
                         && ball.posX - ball.radius >  brick.posX + brick.l-marge) //right side
                    {
                        brick.status--;
                        if (brick.status == 2) brick.color = "rgba(255,165,0,0.5)";
                        if (brick.status == 1) brick.color = "orange";

                        power(brick);
                        broken.play();

                        sens = -sens;
                    }
                } 
            }
    
        /*************Final Action************************/
        ball.posY += gravity
        ball.posX += sens;
        if(move !== undefined) for(let line of tabBricks) for (let brick of line) moveBricks(brick);
        /*************************************************/
    
        if (!stopAnimation) requestAnimationFrame(motion); // Freeze animation
    }requestAnimationFrame(motion);
    
    
    /************************************Function Bricks Powers***********************/
    function power(item)
    {
        if(item.color == "firebrick")
        {
            sens = (sens>=0)? 8 : -8; //ball faster
            music.playbackRate = 1.5;
            paddle.color = "firebrick"
            info.textContent = "Faster!!!";
            setTimeout( ()=>{
                sens = (sens>=0)? 2.5 : -2.5;
                info.textContent= "";
                music.playbackRate = 1;
                paddle.color = "blue";
            },5000);
        }
    
        else if(item.color == "snow")
        {	
            sens = (sens>=0)?  1.5 : -1.5; //ball slower
            gravity = (gravity>=0)?  2 : -2;
            music.playbackRate = 0.8;
            paddle.color = "snow";
            info.textContent = "Slower!!!";
            setTimeout( ()=>{
                sens = (sens>=0)? 2.5 : -2.5;
                gravity = (gravity>=0)?  4 : -4;
                info.textContent= "";
                paddle.color ="blue";
                music.playbackRate = 1;
            },5000);
        }
        
        else if(item.color == "chartreuse")//random sens
        {
            sens = 0;
            gravity = 1;
            paddle.color = "chartreuse";
            ball.color = "paleGreen";
            info.textContent= "Hey ball! what are you doing?";
            setTimeout( ()=>{
                sens = Math.random()*7+1;
                gravity = 5;
                ball.color = "red";
                paddle.color = "blue";
                info.textContent= "";
            },1000);
        }
    
        else if(item.color == "yellow")
        {
            bigger.play();
            paddle.l+=20; //paddle bigger
            paddle.color = "yellow";
            info.textContent = "Yeah, paddle is bigger!";
        }
        
        else if(item.color == "dimGray") //paddle smaller
        {
            smaller.play();
            paddle.l-=20;
            paddle.color = "dimGray";
            info.textContent = "What!!!, paddle is smaller!";
        }
    
        else if(item.color == "burlyWood") //paddle speed lower
        {
            paddleSpeed = 5;
            paddle.color = "burlyWood";
            info.textContent = "Nooo! Paddle is slower!";
            setTimeout( ()=>{
                paddleSpeed = 10;
                paddle.color = "blue";
                info.textContent= "";
            },5000);
        }
        
        else if(item.color == "purple") //paddle speed faster
        {
            paddleSpeed = 15;
            paddle.color = "purple";
            info.textContent = "Paddle is faster!";
            setTimeout( ()=>{
                paddleSpeed = 10;
                paddle.color = "blue";
                info.textContent= "";
            },5000);
            
        }
    
        else if(item.color == "darkGreen") //ball bigger
        {
            ball.radius = 20; 
            ball.color = "orangered";
            info.textContent = "What's that? a big ball?!";
            setTimeout(()=>{
                ball.radius = sizeBall; 
                ball.color = "red";
            },5000);
    
        }

        else if(item.color == "black") //ball smaller
        {
            ballSmall.play();
            ball.radius = 4; 
            ball.color = "black";
            info.textContent = "What's that? a small ball?!";
            setTimeout(()=>{
                ball.radius = sizeBall; 
                ball.color = "red";
            },5000);
    
        }
    
        else if(item.color == "hotpink") //Extra Life
        {
            life++;
            heartUpadte();
            info.textContent = "Yeah! Extra Life!";
            extraLife.play();
            setTimeout(()=>{
                info.textContent = "";
            },2000);
        }

        else if(item.color == "powderBlue")
        {
            launch.play();
            beginGame = false;
            init();
            info.textContent = "Yeah! The ball on me!";
            ball.color = "white";
            paddle.color = "powderBlue";
            document.body.onkeyup = (e)=>
            {   
                if(e.key == " ")
                {
                    paddle.color = "blue";
                    ball.color   = "red"; 
                    info.textContent = "";
                }
            };
        }

        else if(item.color == "red")
        {
            finalflash.play();
            info.textContent = "Final Flash!!!";
            ball.color = "gold";
            paddle.l+=20;
            paddle.color = "red";
            init();
            const interval = setInterval(()=>{
                ball.radius+=1;
                if(ball.radius >= 230) clearInterval(interval);   
            },10);
        }

        else if(item.color == "cyan")
        {
            rasengan.play();
            info.textContent = "Rasen Gan!!!";
            ball.color = "cyan";
            paddle.color = "red";
            const interval = setInterval(()=>{
                ball.radius+=1;
                sens = 0;
                gravity = 0;
                if(ball.radius >= 70) clearInterval(interval);   
            },10);

            setTimeout(()=>{
                ball.radius = sizeBall; 
                ball.color = "red";
                paddle.color = "blue";
                sens = 2.5;
                gravity = 4;
                info.textContent = "";
            },1500);
        }

        else if(item.color == "thistle") //Extra Life
        {
            info.textContent = "Stop the Scroll, please!";
            gravityBrick = -gravityBrick;
            setTimeout(()=>{
                info.textContent = "";
            },3000);
        }

    
    }
    
    /***********************************Functions Victory/Game Over***************/
    function drawGameOver()
    {
        ctx.beginPath();
        ctx.rect(0,canvasH/2-40,canvasW,100);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.strokeStyle = "red";
        ctx.stroke();
    
        ctx.fillStyle = "blue";
        ctx.font = "70px orbitron";
        ctx.fillText("GAME OVER",100,canvasH/2+30);
        ctx.strokeStyle = "red";
        ctx.strokeText("GAME OVER",100,canvasH/2+30);
    
        music.pause();
        gameover.play();
        stopAnimation = true;
    
        info.textContent = "Press Space Bar to play again";
    
        document.onkeypress = (e) => {
            if(e.key == " ") document.location.reload();
            else if (e.key == "Enter") document.location = "./index.html";
        };

    }
    
    function drawVictory()
    {
        ctx.beginPath();
        ctx.rect(0,canvasH/2-40,canvasW,100);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.strokeStyle = "red";
        ctx.stroke();
        
        ctx.fillStyle = "blue";
        ctx.font = "70px orbitron";
        ctx.fillText("VICTORY!",150,canvasH/2+30);
        ctx.strokeStyle = "red";
        ctx.strokeText("VICTORY!",150,canvasH/2+30);
            
        music.pause();
        victory.play();
        stopAnimation = true;	
        setInterval( ()=>{info.textContent = "Press Space Bar to unlock the Next Level";}
        ,1000);
    
        unlockNextLevel();
    }
    /***************Sound Control****************************************/
    speaker.onclick = () =>{mute();}

    let getStorage  = localStorage.getItem('saveMute'); //verify if data in storage
    let soundActive = (getStorage != null)? getStorage : 1;

    if(soundActive == 0)
    {
        soundActive = 1;
        mute();
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




    /*********Function Move Bricks************************************/
    function moveBricks(brick)
    {
        brick.posX += sensBrick;
        if(scrollY == true)
        brick.posY -= gravityBrick;
    }

    if(move !== undefined) setInterval(function(){sensBrick = -sensBrick;},3000);






    /*****************************End of onload**********************/
    }