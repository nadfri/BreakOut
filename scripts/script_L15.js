myCanvas.style.backgroundImage = "url('img/L15.jpg')";
level.textContent = "Level 15";

const nLine = 12; // number of lines
const nCol  = 11; // number of columns
const bricks = new Shape(60,45,51,18,0,"rgba(80,50,50,0.7)"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/Piccolo.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_16", true);  
}

/************************Creation of Bricks**************************************/
function createBricks(tab)
{
    const tabColours = ["midnightBlue","royalBlue","powderBlue",
                        "deepPink","hotpink",
                        "burlyWood", "snow",
                        "chartreuse", "darkGreen","olive",
                        "firebrick","orangeRed",
                        "yellow", "dimGray",
                        "purple","black","cyan"
                        ]; 
  
    
    for(let line = 0; line<nLine; line++) //number of lines
    {
        tab[line] = []; //create array of array
    
        for (let col=0; col<nCol; col++) //number of columns
        {	
            tab[line][col]        = Object.create(bricks); //each array is a brick objet
            tab[line][col].posX   = bricks.posX + (bricks.l+7)*col;
            tab[line][col].posY   = bricks.posY + (bricks.h+7)*line;
            //tab[line][col].stroke = "transparent";
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 4; // add new property 
            tab[line][col].stroke = "red";
        }
    }
    
//*************************Special Bricks************************* */

for(let i=0; i<nCol;i+=2)
{
    tab[0][i].color = "firebrick";
    tab[0][i].status = 1;
}

for(let i=1; i<nLine;i+=3)
{
    tab[i][7].color = "chartreuse";
    tab[i][7].status = 1;
}

for(let i=0; i<nLine;i+=3)
{
    tab[i][4].color = "black";
    tab[i][4].status = 1;
}


for(let i=0;i<nLine;i++)
{
    tab[i][6].status = 0;
    tab[i][5].status = 0;
}

tab[nLine-4][0].color = "firebrick";
tab[nLine-4][0].status = 1; 


tab[2][0].color = "chartreuse";
tab[2][0].status = 1;

tab[2][nCol-1].color = "cyan";
tab[2][nCol-1].status = 1;

tab[3][nCol-3].color = "cyan";
tab[3][nCol-3].status = 1;

tab[nLine-3][nCol-1].color = "cyan";
tab[nLine-3][nCol-1].status = 1;

tab[6][2].color = "cyan";
tab[6][2].status = 1;

tab[1][3].color = "cyan";
tab[1][3].status = 1;

tab[nLine-2][1].color = "cyan";
tab[nLine-2][1].status = 1;


tab[nLine-1][nCol-1].color = "dimGray";
tab[nLine-1][nCol-1].status = 1;

tab[nLine-1][nCol-2].color = "dimGray";
tab[nLine-1][nCol-2].status = 1;

tab[nLine-1][nCol-3].color = "dimGray";
tab[nLine-1][nCol-3].status = 1;

tab[nLine-1][nCol-4].color = "powderBlue";
tab[nLine-1][nCol-4].status = 1;

tab[nLine-1][3].color = "powderBlue";
tab[nLine-1][3].status = 1;

tab[nLine-1][2].color = "yellow";
tab[nLine-1][2].status = 1;

tab[7][0].color = "yellow";
tab[7][0].status = 1;

tab[1][1].color = "darkGreen";
tab[1][1].status = 1;

tab[8][1].color = "darkGreen";
tab[8][1].status = 1;

tab[6][7].color = "darkGreen";
tab[6][7].status = 1;


tab[nLine-2][nCol-1].color = "burlyWood";
tab[nLine-2][nCol-1].status = 1;

tab[0][nCol-4].color = "burlyWood";
tab[0][nCol-4].status = 1;

tab[nLine-2][4].color = "purple";
tab[nLine-2][4].status = 1;

tab[5][0].color = "purple";
tab[5][0].status = 1;


tab[nLine-1][0].color = "snow";
tab[nLine-1][0].status = 1;

tab[nLine-3][4].color = "snow";
tab[nLine-3][4].status = 1;

tab[2][4].color = "hotpink";
tab[2][4].status = 1;

tab[nLine-3][2].color = "hotpink";
tab[nLine-3][2].status = 1;



}