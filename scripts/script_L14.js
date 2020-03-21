myCanvas.style.backgroundImage = "url('img/L14.jpg')";
level.textContent = "Level 14";

const nLine = 17; // number of lines
const nCol  = 9; // number of columns
const bricks = new Shape(40,40,65,20,0,"rgba(100,50,0,0.3"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/Fzero.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_15", true);  
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
                        "purple","black"
                        ]; 
  
    
    for(let line = 0; line<nLine; line++) //number of lines
    {
        tab[line] = []; //create array of array
    
        for (let col=0; col<nCol; col++) //number of columns
        {	
            tab[line][col]        = Object.create(bricks); //each array is a brick objet
            tab[line][col].posX   = bricks.posX + (bricks.l+5)*col;
            tab[line][col].posY   = bricks.posY + (bricks.h+5)*line;
            //tab[line][col].stroke = "transparent";
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 2; // add new property 
        }
    }
    
//*************************Special Bricks************************* */

for(let i=8;i<nLine-1;i++)
    tab[i][1].status = 0;

for(let i=4;i<nLine;i++)
    tab[i][2].status = 0;

for(let i=2;i<nLine;i++)
    tab[i][3].status = 0;

for(let i=2;i<nLine;i++)
    tab[i][4].status = 0;

//---


for(let i=8;i<nLine-1;i++)
    tab[i][7].status = 0;

for(let i=4;i<nLine;i++)
    tab[i][6].status = 0;

for(let i=2;i<nLine;i++)
    tab[i][5].status = 0;


tab[nLine-1][0].color = "powderBlue";
tab[nLine-1][0].status = 1;

tab[nLine-1][nCol-1].color = "powderBlue";
tab[nLine-1][nCol-1].status = 1;

tab[2][nCol-2].color = "powderBlue";
tab[2][nCol-2].status = 1;

tab[0][4].color = "hotpink";
tab[0][4].status = 1;

tab[1][4].color = "chartreuse";
tab[1][4].status = 1;

tab[0][0].color = "chartreuse";
tab[0][0].status = 1;

tab[0][nCol-1].color = "chartreuse";
tab[0][nCol-1].status = 1;

tab[6][nCol-1].color = "chartreuse";
tab[6][nCol-1].status = 1;

tab[6][0].color = "chartreuse";
tab[6][0].status = 1;

tab[9][0].color = "darkGreen";
tab[9][0].status = 1;

tab[9][nCol-1].color = "darkGreen";
tab[9][nCol-1].status = 1;

tab[1][3].color = "dimGray";
tab[1][3].status = 1;

tab[1][5].color = "dimGray";
tab[1][5].status = 1;

tab[11][0].color = "dimGray";
tab[11][0].status = 1;

tab[2][1].color = "yellow";
tab[2][1].status = 1;


tab[7][1].color = "firebrick";
tab[7][1].status = 1;

tab[7][nCol-2].color = "firebrick";
tab[7][nCol-2].status = 1;

tab[6][1].color = "purple";
tab[6][1].status = 1;

tab[6][nCol-2].color = "purple";
tab[6][nCol-2].status = 1;


tab[3][2].color = "black";
tab[3][2].status = 1;

tab[3][nCol-3].color = "black";
tab[3][nCol-3].status = 1;

tab[nLine-1][1].color = "snow";
tab[nLine-1][1].status = 1;

tab[nLine-1][nCol-2].color = "snow";
tab[nLine-1][nCol-2].status = 1;










}