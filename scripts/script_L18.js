myCanvas.style.backgroundImage = "url('img/L18x.jpg')";
level.textContent = "Level 18";

const nLine      = 18; // number of lines
const nCol       = 9; // number of columns
const bricks     = new Shape(15,20,40,15,0,"orange"); //(posX,posY,l,h,radius,color)
music.src        = "sounds/Kotake.mp3";
scrollX          = true;
scrollY          = true;
let sensBrick    = 1.5;
let gravityBrick = 0.2;

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_19", true);  
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
                        "purple","black","cyan","thistle" 
                        ]; 
  
    
    for(let line = 0; line<nLine; line++) //number of lines
    {
        tab[line] = []; //create array of array
    
        for (let col=0; col<nCol; col++) //number of columns
        {	
            tab[line][col]        = Object.create(bricks); //each array is a brick objet
            tab[line][col].posX   = bricks.posX + (bricks.l+7)*col;
            tab[line][col].posY   = bricks.posY + (bricks.h+7)*line;
            //tab[line][col].stroke = "cyan";
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 1; // add new property 
        }
    }

//*************************Special Bricks************************* */
for(let i=0; i<nLine;i++)
{
    tab[i][0].status = 0;
    tab[i][nCol-1].status = 0;
}

for(let i=1; i<nCol-1;i++)
{
    tab[0][i].status = 0;
    tab[1][i].status = 0;
    tab[nLine-1][i].status = 0;
    tab[nLine-2][i].status = 0;
}

for(let i=2;i<16;i++)
{
    tab[i][1].status = 0;
    tab[i][7].status = 0;
}

tab[2][2].status = 0;
tab[3][2].status = 0;
tab[2][6].status = 0;
tab[3][6].status = 0;

tab[14][2].status = 0;
tab[15][2].status = 0;
tab[14][6].status = 0;
tab[15][6].status = 0;

tab[0][4].color = "powderBlue";
tab[0][4].status = 1;

tab[1][4].color = "thistle";
tab[1][4].status = 1;

tab[16][4].color = "powderBlue";
tab[16][4].status = 1;

tab[17][4].color = "thistle";
tab[17][4].status = 1;

tab[8][0].color = "powderBlue";
tab[8][0].status = 1;

tab[9][0].color = "thistle";
tab[9][0].status = 1;

tab[8][8].color = "powderBlue";
tab[8][8].status = 1;

tab[9][8].color = "thistle";
tab[9][8].status = 1;

tab[11][1].color = "thistle";
tab[11][1].status = 1;

tab[11][7].color = "thistle";
tab[11][7].status = 1;

tab[13][2].color = "thistle";
tab[13][6].color = "thistle";

tab[15][3].color = "powderBlue";
tab[15][5].color = "powderBlue";

tab[6][1].color = "thistle";
tab[6][1].status = 1;

tab[6][7].color = "thistle";
tab[6][7].status = 1;

tab[4][2].color = "thistle";
tab[4][6].color = "thistle";

tab[3][4].color = "thistle";
tab[14][4].color = "thistle";

tab[7][2].color = "thistle";
tab[7][6].color = "thistle";
tab[10][2].color = "thistle";
tab[10][6].color = "thistle";

tab[7][1].color = "powderBlue";
tab[7][1].status = 1;

tab[7][7].color = "powderBlue";
tab[7][7].status = 1;

tab[10][1].color = "powderBlue";
tab[10][1].status = 1;

tab[10][7].color = "powderBlue";
tab[10][7].status = 1;

tab[2][3].color = "hotpink";
tab[2][5].color = "yellow";
tab[2][4].color = "dimGray";

tab[3][3].color = "firebrick";
tab[3][5].color = "firebrick";

tab[8][4].color = "hotpink";

tab[5][2].color = "chartreuse";
tab[5][6].color = "chartreuse";

tab[8][1].color = "black";
tab[8][1].status = 1;


tab[8][7].color = "black";
tab[8][7].status = 1;

tab[14][3].color = "darkGreen";
tab[14][5].color = "darkGreen";

tab[5][4].color = "thistle";
tab[11][4].color = "thistle";

tab[9][1].color = "purple";
tab[9][1].status = 1;

tab[9][7].color = "burlyWood";
tab[9][7].status = 1;

tab[15][4].color = "snow";


}