window.onload = () =>{
"use strict";
/*****************************Start of onload**********************/
let canvasH = myCanvas.height = 500;
let canvasW = myCanvas.width  = 700;
const ctx   = myCanvas.getContext("2d");



let right = false;
let left  = false;
let gravity = 4;
let sens = 2;

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



const ball = new Shape(20,20,0,0,20,"red");

const paddle = new Shape(0,0,100,10,0,"blue");
paddle.posX = (canvasW - paddle.larg)/2;
paddle.posY = canvasH - paddle.h;
paddle.control();

let imgData;

function motion()
{
	/******************Draw Shape***************************************/
	ctx.clearRect(0, 0, canvasW, canvasH); //delete canvas
	ball.drawCircle();
	paddle.drawRect();
	


	/*******************Motion Ball gravity******************************/
	//if (ball.posY - ball.radius < 0 || ball.posY + ball.radius > canvasH )

	if (ball.posY - ball.radius < 0 // rebond sur le toit
		||
	   (ball.posY + ball.radius > paddle.posY  //rebond sur le paddle
		  && ball.posX + ball.radius > paddle.posX 
	      && ball.posX < paddle.posX+ paddle.larg))
		gravity =- gravity;

	else if (ball.posY + ball.radius > canvasH)
	{
		alert("perdu");
		document.location.reload();
	}


	/*************Action************************/
	ball.posY += gravity

	/*******************Motion Ball gravity******************************/
	if (ball.posX - ball.radius < 0 || ball.posX + ball.radius > canvasW)
		sens = -sens;

	ball.posX += sens;

	/*******************Motion Paddle************************************/
	if(right && paddle.posX < canvasW-paddle.larg) paddle.posX+=10;
    if(left  && paddle.posX > 0)                   paddle.posX-=10;
    /********************************************************************/





	requestAnimationFrame(motion); //why here?


}requestAnimationFrame(motion);








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