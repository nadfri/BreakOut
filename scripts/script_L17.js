myCanvas.style.backgroundImage = "url('img/L17x.jpg')";
level.textContent = "Level 17";

const nLine  = 8; // number of lines
const nCol   = 11; // number of columns
const bricks = new Shape(40,20,50,20,0,"orange"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/offroad.mp3";
move = true;
let sensBrick = 0;
let gravityBrick = 0.3;


function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_18", true);  
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
            tab[line][col].posY   = bricks.posY + (bricks.h+10)*line;
            //tab[line][col].stroke = "cyan";
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 1; // add new property 
        }
    }


    
//*************************Special Bricks************************* */

tab[0][nCol-1].color = "thistle";
tab[nLine-3][0].color = "thistle";
tab[nLine-3][nCol-1].color = "thistle";

for(let i=0; i<nCol;i+=2)
    tab[3][i].color = "powderBlue";

tab[0][0].color = "thistle";

tab[2][2].color = "thistle";
tab[2][8].color = "thistle";

tab[4][4].color = "thistle";
tab[4][6].color = "thistle";

tab[6][5].color = "thistle";

tab[0][1].color = "firebrick";
tab[0][4].color = "firebrick";
tab[0][nCol-2].color = "firebrick";
tab[0][nCol-5].color = "firebrick";
tab[3][5].color = "firebrick";


tab[0][5].color = "thistle";

tab[2][5].color = "thistle";
tab[4][5].color = "hotpink";

tab[nLine-2][2].color = "thistle";
tab[nLine-2][8].color = "thistle";

for(let i=1; i<nCol;i+=2)
    tab[nLine-1][i].status = 0;


}