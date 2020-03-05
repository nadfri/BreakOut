window.onload = () =>{
"use strict";
/*****************************Start of onload**********************/
const canvasH = myCanvas.height = 500;
const canvasW = myCanvas.width  = 700;
const ctx     = myCanvas.getContext("2d");

/******************************Audios******************************/
const tetris   = new Audio("sounds/tetris.mp3");
const gameover = new Audio("sounds/gameover.mp3");
const broken   = new Audio("sounds/broken.wav");
const victory  = new Audio("sounds/victory.mp3");

/************************Class Shape*******************************/
class Shape
{
	constructor (posX,posY,larg,h,radius,color)
	{
		this.posX = posX;		
		this.posY = posY;
		this.larg = larg;
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
    	ctx.rect(this.posX,this.posY,this.larg,this.h);
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


const paddle = new Shape(0,0,125,20,0,"blue");
paddle.posX  = (canvasW - paddle.larg)/2;
paddle.posY  =  canvasH - paddle.h;
let paddleSpeed = 10; paddle.control();

const ball   = new Shape(paddle.posX+paddle.larg/2,paddle.posY-5,0,0,5,"red");

let gravity, sens, tabBricks=[], count;

let right         = false;
let left          = false;
let stopAnimation = false;
let beginGame     = false; //to avoid space bar function





function motion()
{
	/******************Draw Shape***************************************/
	ctx.clearRect(0, 0, canvasW, canvasH); //clear canvas
	ball.drawCircle();
	paddle.drawRect();

	if(beginGame == false)
	{
		ball.posX = paddle.posX+paddle.larg/2
		ball.posY = paddle.posY-5; 
		gravity = 0;
		sens    = 0;
		count   = 0;
	}

	
	for(let line of tabBricks)
		for (let brick of line)
			if (brick.status == 1)
			{
				brick.drawRect();
				count++;
			}
	
	if (count == 0) drawVictory();


  
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

	if (ball.posY + ball.radius >= canvasH) //ground
		drawGameOver();
	
	/********************************Motion Paddle***************************************/
	if(right && paddle.posX < canvasW-paddle.larg) paddle.posX+= paddleSpeed;
    if(left  && paddle.posX > 0)                   paddle.posX-= paddleSpeed;

	/********************************Paddle Collision*************************************/
	if(ball.posX >= paddle.posX && ball.posX <= paddle.posX + paddle.larg) //ball between paddle limits in X
		if(ball.posY + ball.radius >= paddle.posY && ball.posY <= canvasH) //ball between paddle limitis in Y
		{
			gravity = -gravity;
			ball.posY = paddle.posY - ball.radius -1 //out ball from paddle

			if     (right) sens = +Math.abs(sens); 	
			else if(left)  sens = -Math.abs(sens); 
		}

    /*********************************Brick Collision***********************************/
	for (let line of tabBricks)
		for (let brick of line)
		{
			if(ball.posX >= brick.posX && ball.posX <= brick.posX + brick.larg && brick.status ==1) //ball between brick limits in X
			{
				if(ball.posY - ball.radius <= brick.posY + brick.h//ball under brick
					&& ball.posY - ball.radius > brick.posY + brick.h -15)
				{
					gravity =- gravity;
					brick.status = 0;
					power(brick);
					broken.play();
				}

				else if (ball.posY + ball.radius >= brick.posY //ball over brick
					&& ball.posY + ball.radius < brick.posY + 15)
				{
					gravity =- gravity;
					brick.status = 0;
					power(brick);
					broken.play();
				}
			}


			if(ball.posY >= brick.posY && ball.posY <= brick.posY + brick.h && brick.status ==1) 
			{
				if(ball.posX + ball.radius >= brick.posX && ball.posX + ball.radius < brick.posX +10) //left brick side
				{
					sens = -sens;
					brick.status = 0;
					power(brick);
					broken.play();
				}

				else if(ball.posX - ball.radius <= brick.posX + brick.larg 
					 && ball.posX - ball.radius >  brick.posX + brick.larg-10) //right side OK
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

	if (!stopAnimation) requestAnimationFrame(motion);
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
	const bricks = new Shape(10,10,60  ,20,0,"orange"); //(posX,posY,larg,h,radius,color)

	for(let line =0; line<7; line++) //number of lines
	{
		tab[line] = []; //create array of array

		for (let col=0; col<11; col++) //number of columns
		{	
			tab[line][col]        = Object.create(bricks); //each array is a brick objet
			tab[line][col].posX   = bricks.posX + (2+bricks.larg)*col;
			tab[line][col].posY   = bricks.posY + (2+bricks.h)*line;
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
	}

	else if(item.color == "hotpink")
	{	
		sens = (sens>=0)?  2 : -2; //ball slower
		gravity = (gravity>=0)?  -2 : +2;
		tetris.playbackRate = 0.8;
		paddle.color = "hotpink";
		info.textContent = "Slower!!!";
	}
	
	else if(item.color == "limegreen")//random sens
	{
		sens = 0;
		gravity = 1;
		setTimeout( ()=>{sens= Math.random()*7+1;gravity=2;},1000);
		paddle.color = "limegreen";
		info.textContent= "Hey ball! what are you doing?";
	}

	else if(item.color == "gold")
	{
		paddle.larg+=30; //paddle bigger
		paddle.color = "gold";
		info.textContent = "Yeah, paddle is bigger!";
	}
	
	else if(item.color == "fuchsia") //paddle smaller
	{
		paddle.larg-=20;
		paddle.color = "fuchsia";
		info.textContent = "What!!!, paddle is smaller!";
	}

	else if(item.color == "white") //paddle speed lower
	{
		paddleSpeed = 6;
		paddle.color = "white";
		info.textContent = "Nooo! Paddle is slower!";
	}
	
	else if(item.color == "aqua") //paddle speed faster
	{
		paddleSpeed = 15;
		paddle.color = "aqua";
		info.textContent = "Paddle is faster!";
	}

	else if(item.color == "black") //ball bigger
	{
		ball.radius = 20;
		paddle.color = "black";
		info.textContent = "What's that? a big ball?!";
	}

	else
	{
		gravity = (gravity>=0)?  4 : -4;
		paddleSpeed = 10;
		tetris.playbackRate = 1;
		ball.radius = 5;
		info.textContent= "";
		if(paddle.color != "gold" && paddle.color != "fuschia")
			paddle.color = "blue";
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
	info.textContent = "Press Space Bar to play again";

	document.onkeypress = (e) => {if(e.key == " ") document.location.reload();};
	
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



	

/*******************Launch Game *************************************/
document.onkeypress = (e) =>
{
	if(e.key == " " && beginGame == 0)
	{
		sens = 4;
		gravity = -4;
		tetris.play();
		tetris.loop = true;
		info.textContent ="";
		beginGame = true;
	}

};


/*********************Mouse Position********************************/
myCanvas.addEventListener("mousemove", function(event) {
	let decalage = myCanvas.getBoundingClientRect(); //donne la position du canvas
	let border = 10; //border CSS of canvas
   gps.textContent = `Coordonnées Souris => x:${event.clientX-decalage.left-border} 
											 / y:${event.clientY-decalage.top-border}`;
   });


/*****************************End of onload**********************/
};
