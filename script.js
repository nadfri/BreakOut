window.onload = () =>{
"use strict";
/*****************************Start of onload**********************/
let canvasH = myCanvas.height = 500;
let canvasW = myCanvas.width  = 700;
const ctx   = myCanvas.getContext("2d");

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
    	ctx.strokeStyle = "gold";
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
paddle.posX = (canvasW - paddle.larg)/2;
paddle.posY = canvasH - paddle.h;
let right = false;
let left  = false;
paddle.control();

const ball = new Shape(paddle.posX,paddle.posY,0,0,5,"red");
const bricks = new Shape(10,10,75,20,0,"orange"); //(posX,posY,larg,h,radius,color)

let gravity = 4;
let sens = 4;

let tabBricks=[]; 







function motion()
{
	/******************Draw Shape***************************************/
	ctx.clearRect(0, 0, canvasW, canvasH); //delete canvas
	ball.drawCircle();
	paddle.drawRect();
	let count = 0;
	
	for(let line of tabBricks)
		for (let brick of line)
			if (brick.status == 1)
			{
				brick.drawRect();
				count++;
			}
			
		
	if (count == 0) //Victory
	{
		ctx.fillStyle = "red";
		ctx.font = "60px orbitron";
		ctx.fillText("VICTORY!!!",170,100);
		ctx.strokeStyle = "blue";
		ctx.strokeText("VICTORY!!!",170,100);
		alert("REPLAY?");
		document.location.reload();
	}
	


	/*******************Motion Paddle************************************/
	if(right && paddle.posX < canvasW-paddle.larg) paddle.posX+=10;
    if(left  && paddle.posX > 0)                   paddle.posX-=10;
    /********************************************************************/

	/*******************Wall Collision******************************/
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
	{
		ctx.fillStyle = "red";
		ctx.font = "60px orbitron";
		ctx.fillText("GAME OVER!!!",140,100);
		ctx.strokeStyle = "blue";
		ctx.strokeText("GAME OVER!!!",140,100);
		alert("REPLAY?");
		document.location.reload();
	}

	/********************Paddle Collision*******************************/
	if(ball.posX >= paddle.posX && ball.posX <= paddle.posX + paddle.larg) //ball between paddle limits in X
		if(ball.posY + ball.radius >= paddle.posY && ball.posY <= canvasH) //ball between paddle limitis in Y
		{
			gravity = -gravity;
			ball.posY = paddle.posY - ball.radius -1 //out ball from paddle

			if(right) 
			{
				sens += 2; //speed right
				sens = (sens>8)? 8: sens;
			}

			if(left)  
			{
				sens -= 2; //speed left
				sens  = (sens<-8)? -8: sens;
			}

		}


    /******************Brick Collision***********************************/
	for (let line of tabBricks)
		for (let brick of line)
		{
			if(ball.posX >= brick.posX && ball.posX <= brick.posX + brick.larg && brick.status ==1) //ball between brick limits in X
			{
				if(ball.posY - ball.radius <= brick.posY + brick.h//ball under brick
					&& ball.posY - ball.radius > brick.posY + brick.h -10)
				{
					gravity =- gravity;
					brick.status = 0; 
					
				}

				else if (ball.posY + ball.radius >= brick.posY //ball over brick
					&& ball.posY + ball.radius < brick.posY + 10)
				{
					gravity =- gravity;
					brick.status = 0;
					
				}
			}


			if(ball.posY >= brick.posY && ball.posY <= brick.posY + brick.h && brick.status ==1) 
			{
				if(ball.posX + ball.radius >= brick.posX && ball.posX + ball.radius < brick.posX +10) //left brick side
				{
					sens = -sens;
					brick.status = 0;
				}

				else if(ball.posX - ball.radius <= brick.posX + brick.larg 
					 && ball.posX - ball.radius >  brick.posX + brick.larg-10) //right side OK
				{
					sens = -sens;
					brick.status = 0;
				}
			}

		}


				
				
				



	/*************Action************************/
	ball.posY += gravity
	ball.posX += sens;
	/*******************************************/

	requestAnimationFrame(motion); //why here?


}requestAnimationFrame(motion);





function createBricks(tab)
{
	for(let line =0; line<5; line++)
	{
		tab[line] = []; //create array of array

		for (let col=0; col<8; col++)
		{	
			tab[line][col] = Object.create(bricks); //each array is a brick objet
			tab[line][col].posX = bricks.posX + (10+bricks.larg)*col;
			tab[line][col].posY = bricks.posY + (10+bricks.h)*line;
			tab[line][col].status = 1; // add new property 
		}
	}

}; createBricks(tabBricks);





/*********************Mouse Position********************************/
 myCanvas.addEventListener("mousemove", function(event) {
 	let decalage = myCanvas.getBoundingClientRect(); //donne la position du canvas
    gps.textContent = `Coordonnées Souris => x:${event.clientX-decalage.left} / y:${event.clientY-decalage.top}`;
    });
 /*********************Mouse Position********************************/



















/*****************************End of onload**********************/
};

	/*
	ctx.globalCompositeOperation = 'lighter';
	imgData = ctx.getImageData(0, 490, 700, 10);
	for (let i=0; i<imgData.data.length;i+=4) //collision by color difference
	{
		if (imgData.data[i] == 255 && imgData.data[i+2] == 255)
		{
			gravity =-gravity;
			break;
		}
	}*/