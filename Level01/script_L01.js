window.onload = () =>{
"use strict";
/*****************************Start of onload**********************/
const canvasH = myCanvas.height = 500;
const canvasW = myCanvas.width  = 700;
const ctx     = myCanvas.getContext("2d");

/******************************Audios******************************/
const tetris    = new Audio("../sounds/tetris.mp3");
const gameover  = new Audio("../sounds/gameover.mp3");
const broken    = new Audio("../sounds/broken.wav");
const victory   = new Audio("../sounds/victory.mp3");
const lost      = new Audio("../sounds/lost.mp3");
const extraLife = new Audio("../sounds/extraLife.mp3");

const tabAudio = [tetris,gameover,broken,victory,lost,extraLife];
let soundActive;


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
		ctx.strokeStyle = "black";
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

/****************Declaration of Global Variables********************/
const paddle = new Shape(0,0,120,20,0,"blue");
paddle.posX  = (canvasW - paddle.l)/2;
paddle.posY  =  canvasH - paddle.h;
let paddleSpeed = 10; paddle.control();

let sizeBall = 7;
const ball   = new Shape(0,0,0,0,sizeBall,"red"); //x,y,**,**,radius,color

let gravity, sens, tabBricks=[], count;
let life = 3;

let right         = false;
let left          = false;
let stopAnimation = false;
let beginGame     = false; //to avoid space bar function

/*******************Launch Game *************************************/
document.onkeypress = (e) =>
{
	if(e.key == " " && beginGame == 0) //launch by press bar space
	{
		sens    		 = 3;
		gravity 		 = 4;
		tetris.loop      = true;
		beginGame        = true;
		info.textContent = "";
		tetris.play();
		beginGame = true;
	}
};

drawVictory();

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


function motion()
{
	/******************Draw Shape***************************************/
	ctx.clearRect(0, 0, canvasW, canvasH); //clear canvas
	ball.drawCircle();
	paddle.drawRect();
	count   = 0;

	if(beginGame == false) // init before to play
	{
		init();
	}
	
	for(let line of tabBricks)
		for (let brick of line)
			if (brick.status == 1)
			{
				brick.drawRect();
				count++;
			}
	
	if (count == 0) drawVictory();
	if (life == 0)  drawGameOver();

	/********************************Motion Paddle***************************************/
	if(right && paddle.posX < canvasW-paddle.l) paddle.posX+= paddleSpeed;
    if(left  && paddle.posX > 0)                paddle.posX-= paddleSpeed;
  
	/********************************Wall Collision************************************/
	if(ball.posY - ball.radius <= 0) //roof
	{
		gravity = -gravity; 
		ball.posY = ball.radius +1;
	}

	if(ball.posX - ball.radius <= 0 ) //wall left
	{	
		sens = -sens; 
		ball.posX = ball.radius +1;
	}

	if(ball.posX + ball.radius >= canvasW) //wall right
	{
		sens = -sens;
		ball.posX = canvasW - ball.radius -1;
	}

	if (ball.posY + ball.radius >= canvasH) //***Game lost***
		{
			life--;
			beginGame = false;
			heart.textContent = "";
			lost.play();
			init();
		};

	/********************************Paddle Collision******************************************/
	if(ball.posX > paddle.posX 
	&& ball.posX < paddle.posX + paddle.l) //ball between paddle limits in X
		if(ball.posY + ball.radius >= paddle.posY 
		&& ball.posY < canvasH) //ball between paddle limitis in Y
		{
			gravity = -gravity;
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
		{	let marge = ball.radius;
	//********************************Brick Horizontal Side*************************************/
			if(ball.posX > brick.posX 
			&& ball.posX < brick.posX + brick.l 
			&& brick.status == 1) //ball between brick
			{
				if(ball.posY - ball.radius <= brick.posY + brick.h 
				&& ball.posY - ball.radius >= brick.posY + brick.h - marge) //bottom side
				{
					gravity      =- gravity;
					brick.status = 0;
					power(brick);
					broken.play(); 	
				}


				if(ball.posY + ball.radius > brick.posY
				&& ball.posY + ball.radius < brick.posY + marge) //top side
				{
					gravity      =- gravity;
					brick.status = 0;
					power(brick);
					broken.play();	
				}
			}
			//****************Brick Corner Bottom******************************************/
			if(brick.posY + brick.h >= ball.posY - ball.radius
			&& brick.posY + brick.h <= ball.posY && brick.status == 1) 

				if(brick.posX >= ball.posX
				&& brick.posX <= ball.posX + ball.radius) //left Bottom
				{
					gravity = Math.abs(gravity);
					sens    = (sens>0)? -sens : sens;
					brick.status = 0;
					power(brick);
					broken.play();
				}
			
			//****************Brick Corner Right Bottom*************************************/
			else if(brick.posX + brick.l >= ball.posX - ball.radius
				 && brick.posX + brick.l <= ball.posX) //Right Bottom
				{
					gravity = Math.abs(gravity);
					sens    = (sens<0)? -sens : sens;
					brick.status = 0;
					power(brick);
					broken.play();
				}
				
			//******************Brick Corner Top*********************************************/
			if(brick.posY >= ball.posY 
			&& brick.posY <= ball.posY + ball.radius && brick.status == 1) //ball in Top Corner
			

			 	if(brick.posX  >= ball.posX
				&& brick.posX  <= ball.posX + ball.radius) //Left Top
				{
					gravity = -Math.abs(gravity);
					sens    = (sens>0)? -sens : sens;
					brick.status = 0;
					power(brick);
					broken.play();
				}
				
			else if(brick.posX + brick.l >= ball.posX - ball.radius
				 && brick.posX + brick.l <= ball.posX) //Right Top
				{
					gravity = -Math.abs(gravity);
					sens    = (sens<0)? -sens : sens;
					brick.status = 0;
					power(brick);
					broken.play();//brick.status = 0; 
				} 

			//***************Brick Vertical Side*******************************************/
			if(ball.posY > brick.posY 
			&& ball.posY < brick.posY + brick.h && brick.status ==1) //ball between brick.h
			{
				if(ball.posX + ball.radius >= brick.posX 
				&& ball.posX + ball.radius < brick.posX +marge) //left brick side
				{
					sens = -sens;
					brick.status = 0;
					power(brick);
					broken.play();
				}

				else if(ball.posX - ball.radius <= brick.posX + brick.l 
					 && ball.posX - ball.radius >  brick.posX + brick.l-marge) //right side OK
				{
					sens = -sens;
					brick.status = 0;
					power(brick);
					broken.play();
				}
			}
			
		}

	/*************Final Action************************/
	ball.posY += gravity
	ball.posX += sens;
	/*************************************************/

	if (!stopAnimation) requestAnimationFrame(motion); // Freeze animation
}requestAnimationFrame(motion);



/************************Creation of Bricks**************************************/
function createBricks(tab)
{
	const tabColours = ["darkcyan","aqua","lightcyan","powderblue","midnightblue",
						"olivedrab","limegreen","darkseagreen",
						"orangered","firebrick",
						"hotpink","lightsalmon","mistyrose",
						"gold", "beige",
						"slategray","white","grey",
						"purple","fuchsia","thistle","plum",
						"black"
						]; 
	const bricks = new Shape(50,50,70,20,0,"orange"); //(posX,posY,l,h,radius,color)

	for(let line =0; line<6; line++) //number of lines
	{
		tab[line] = []; //create array of array

		for (let col=0; col<8; col++) //number of columns
		{	
			tab[line][col]        = Object.create(bricks); //each array is a brick objet
			tab[line][col].posX   = bricks.posX + (bricks.l+5)*col;
			tab[line][col].posY   = bricks.posY + (bricks.h+5)*line;
			tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
			tab[line][col].status = 1; // add new property 
		}
	}

}; createBricks(tabBricks);

/************************************Function Bricks Powers***********************/
function power(item)
{
	if(item.color == "orangered")
	{
		sens = (sens>=0)?  8 : -8; //ball faster
		tetris.playbackRate = 1.5;
		paddle.color = "orangered"
		info.textContent = "Faster!!!";
		setTimeout( ()=>{
			sens = (sens>=0)? 3 : -3;
			info.textContent= "";
			tetris.playbackRate = 1;
			paddle.color = "blue";
		},5000);
	}

	else if(item.color == "hotpink")
	{	
		sens = (sens>=0)?  2 : -2; //ball slower
		gravity = (gravity>=0)?  2 : -2;
		tetris.playbackRate = 0.8;
		paddle.color = "hotpink";
		info.textContent = "Slower!!!";
		setTimeout( ()=>{
			sens = (sens>=0)? 3 : -3;
			gravity = (gravity>=0)?  4 : -4;
			info.textContent= "";
			paddle.color ="blue";
			tetris.playbackRate = 1;
		},5000);
	}
	
	else if(item.color == "limegreen")//random sens
	{
		sens = 0;
		gravity = 1;
		setTimeout( ()=>{
			sens = Math.random()*7+1;
			gravity = 5;
			info.textContent= "";
		},1000);
		paddle.color = "limegreen";
		info.textContent= "Hey ball! what are you doing?";
	}

	else if(item.color == "gold")
	{
		paddle.l+=30; //paddle bigger
		paddle.color = "gold";
		info.textContent = "Yeah, paddle is bigger!";
	}
	
	else if(item.color == "fuchsia") //paddle smaller
	{
		paddle.l-=20;
		paddle.color = "fuchsia";
		info.textContent = "What!!!, paddle is smaller!";
	}

	else if(item.color == "white") //paddle speed lower
	{
		paddleSpeed = 6;
		paddle.color = "white";
		info.textContent = "Nooo! Paddle is slower!";
		setTimeout( ()=>{
			paddleSpeed = 10;
			paddle.color = "blue";
			info.textContent= "";
		},5000);
	}
	
	else if(item.color == "aqua") //paddle speed faster
	{
		paddleSpeed = 15;
		paddle.color = "aqua";
		info.textContent = "Paddle is faster!";
		setTimeout( ()=>{
			paddleSpeed = 10;
			paddle.color = "blue";
			info.textContent= "";
		},5000);
		
	}

	else if(item.color == "black") //ball bigger
	{
		ball.radius = 20; 
		ball.color = "yellow";
		paddle.color = "black";
		info.textContent = "What's that? a big ball?!";
		setTimeout(()=>{
			ball.radius = sizeBall; 
			ball.color = "red";
		},5000);

	}

	else if(item.color == "lightsalmon") //Extra Life
	{
		life++;
		heartUpadte();
		info.textContent = "Yeah! Extra Life!";
		extraLife.play();
		setTimeout(()=>{
		info.textContent = "";
		},2000);
	}

}

/***********************************Functions Victory/Game Over***************/
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
		
	tetris.pause();
	victory.play();
	stopAnimation = true;	
	info.textContent = "Press Space Bar to unlock the Next Level";

	document.onkeypress = (e) => {if(e.key == " ") document.location = "../menu.html";};
	
}

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

	tetris.pause();
	gameover.play();
	stopAnimation = true;

	info.textContent = "Press Space Bar to play again";

	document.onkeypress = (e) => {if(e.key == " ") document.location.reload();};
}

/***************Sound Control****************************************/
speaker.onclick = () =>{mute();}

function mute()
{
	if(soundActive)
	{
		soundActive = false;
		speaker.textContent = "🔈";

		for (let audio of tabAudio)
			audio.muted = true;
	}

	else
	{
		soundActive = true;
		speaker.textContent = "🔊";

		for (let audio of tabAudio)
			audio.muted = false;
	}

	const saveData = {audioStatus : soundActive};
	localStorage.setItem("saveData", JSON.stringify(saveData));
}

/*********************WebStorage************************************ */

if(localStorage.getItem('saveData'))
	{
		const saveData = JSON.parse(localStorage.getItem('saveData'));
		soundActive = saveData.audioStatus;

		if(soundActive == false)
		{
			soundActive = true;
			mute();
		}
		
	}


/*********************Mouse Position********************************/
myCanvas.addEventListener("mousemove", function(event) {
	let decalage = myCanvas.getBoundingClientRect(); //donne la position du canvas
	let border = 10; //border CSS of canvas
   gps.textContent = `Coordonnées Souris => x:${event.clientX-decalage.left-border} 
											 / y:${event.clientY-decalage.top-border}`;
   });


/*****************************End of onload**********************/
};
