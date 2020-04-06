myCanvas.style.backgroundImage = "url('img/L16.jpg')";
level.textContent = "Level 16";

const nLine  = 7; // number of lines
const nCol   = 9; // number of columns
const bricks = new Shape(20,50,50,20,0,"powderBlue"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/offroad.mp3";
let scrollX = true;
let sensBrick = 2;

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_17", true);  
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
            tab[line][col].posY   = bricks.posY + (bricks.h+10)*line;
            tab[line][col].stroke = "cyan";
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 10; // add new property 
        }
    }

//*************************Special Bricks************************* */
tab[3][4].color = "red";
tab[3][4].posX += 5;
tab[3][4].l -= 7;
tab[3][4].status  = 1;

tab[1][4].status = 0;
tab[2][3].status = 0;

tab[2][4].color = "rgba(120,0,0,0.5)";
tab[2][4].posX -= 15;
tab[2][4].l = 25;
tab[2][4].status = 10;

tab[2][5].color = "rgba(120,0,0,0.5)";
tab[2][5].posX -= 15;
tab[2][5].l = 25;
tab[2][5].status = 10;

tab[4][4].color = "rgba(120,0,0,0.5)";
tab[4][4].posX -= 15;
tab[4][4].l = 25;
tab[4][4].status = 10;

tab[4][5].color = "rgba(120,0,0,0.5)";
tab[4][5].posX -= 15;
tab[4][5].l = 25;
tab[4][5].status = 10;

tab[3][2].status = 0;
tab[3][3].status = 0;
tab[3][5].status = 0;
tab[3][6].status = 0;
tab[4][3].status = 0;
tab[5][4].status = 0;

for(i=0; i<nCol; i++)
{
    tab[0][i].color = "rgba(120,0,0,0.5)";
    tab[0][i].status = 5;

    tab[nLine-1][i].color = "rgba(120,0,0,0.5)";
    tab[nLine-1][i].status = 5;
}

for(i=0; i<nLine; i++)
{
    tab[i][0].color = "rgba(120,0,0,0.5)";
    tab[i][0].status = 5;
    tab[i][nCol-1].color = "rgba(120,0,0,0.5)";
    tab[i][nCol-1].status = 5;
}

tab[0][3].color = "powderBlue";
tab[0][3].status = 10;
tab[0][5].color = "powderBlue";
tab[0][5].status = 10;
tab[6][3].color = "powderBlue";
tab[6][3].status = 10;

tab[6][5].color = "powderBlue";
tab[6][5].status = 10;


tab[3][nCol-1].color = "hotpink";
tab[3][nCol-1].status = 1;

tab[0][nCol-2].color = "yellow";
tab[0][nCol-2].status = 1;


tab[1][3].color = "rgba(120,0,0,0.5)";
tab[1][3].status = 5;
tab[1][5].color = "rgba(120,0,0,0.5)";
tab[1][5].status = 5;
tab[2][2].color = "rgba(120,0,0,0.5)";
tab[2][2].status = 5;
tab[2][6].color = "rgba(120,0,0,0.5)";
tab[2][6].status = 5;
tab[3][1].color = "rgba(120,0,0,0.5)";
tab[3][1].status = 5;
tab[3][7].color = "rgba(120,0,0,0.5)";
tab[3][7].status = 5;
tab[4][2].color = "rgba(120,0,0,0.5)";
tab[4][2].status = 5;
tab[4][6].color = "rgba(120,0,0,0.5)";
tab[4][6].status = 5;
tab[5][3].color = "rgba(120,0,0,0.5)";
tab[5][3].status = 5;
tab[5][5].color = "rgba(120,0,0,0.5)";
tab[5][5].status = 5;






}