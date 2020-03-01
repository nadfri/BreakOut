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

let tabBricks=[]; 

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


class Bricks
{
	constructor (row,col,larg,h,padding,top,left)
	{
		this.row = row;
		this.col = col;
		this.larg = larg;
		this.h = h;
		this.padding = padding;
		this.top = top;
		this.left = left;
	}

}



const ball = new Shape(100,200,0,0,20,"red");

const paddle = new Shape(0,0,100,5,0,"blue");
paddle.posX = (canvasW - paddle.larg)/2;
paddle.posY = canvasH - paddle.h;
paddle.control();






function motion()
{
	/******************Draw Shape***************************************/
	ctx.clearRect(0, 0, canvasW, canvasH); //delete canvas
	ball.drawCircle();
	paddle.drawRect();
	drawBricks(tabBricks);
	console.log(tabBricks[0][0]);






	/*******************Motion Ball gravity******************************/
	//if (ball.posY - ball.radius < 0 || ball.posY + ball.radius > canvasH )

	if (ball.posY - ball.radius < 0 // rebond sur le toit
		||
	   (ball.posY + ball.radius > paddle.posY  //rebond sur le paddle
		  && ball.posX + ball.radius > paddle.posX 
	      && ball.posX < paddle.posX+ paddle.larg))
		gravity =- gravity;

	else if (ball.posY + ball.radius >= canvasH)
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
	if(right && paddle.posX < canvasW-paddle.larg) paddle.posX+=8;
    if(left  && paddle.posX > 0)                   paddle.posX-=8;
    /********************************************************************/





	//requestAnimationFrame(motion); //why here?


}requestAnimationFrame(motion);


const brick = new Shape(10,10,75,20,0,"orange"); //(posX,posY,larg,h,radius,color)

function drawBricks(tab)
{
	for(let line =0; line<5; line++)
	{
		tab[line] = []; //create array of array

		for (let col=0; col<8; col++)
		{	
			tab[line][col] = Object.create(brick); //each array is a brick objet
			tab[line][col].posX = brick.posX + (10+brick.larg)*col;
			tab[line][col].posY = brick.posY + (10+brick.h)*line;
			tab[line][col].drawRect();
		}
	}


}





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