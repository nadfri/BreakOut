myCanvas.style.backgroundImage = "url('img/L07.jpg')";
level.textContent = "Level 7";

const nLine = 10; // number of lines
const nCol  = 7; // number of columns
const bricks = new Shape(45,5,80,20,0,"orange"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/tetris2.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_08", true);  
}

/************************Creation of Bricks**************************************/
function createBricks(tab)
{
    const tabColours = ["midnightBlue","royalBlue","powderBlue",
                        "deepPink","hotpink",
                        "burlyWood", "snow",
                        "chartreuse", "darkgreen","olive",
                        "firebrick","orangeRed",
                        "yellow", "dimGray",
                        "purple"
                        ]; 
  
    
    for(let line = 0; line<nLine; line++) //number of lines
    {
        tab[line] = []; //create array of array
    
        for (let col=0; col<nCol; col++) //number of columns
        {	
            tab[line][col]        = Object.create(bricks); //each array is a brick objet
            tab[line][col].posX   = bricks.posX + (bricks.l+7)*col;
            tab[line][col].posY   = bricks.posY + (bricks.h+7)*line;
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 1; // add new property 
        }
    }
    
//*************************Special Bricks************************* */

for(let i=2; i<nLine; i++)
{
    tab[i][2].status = 0;
    tab[i][4].status = 0;
}

for(let i=1; i<nLine; i++)
    tab[i][3].status = 0;



for(let i=0; i<nCol; i++)
    tab[0][i].color = "chartreuse";

tab[6][0].color = "chartreuse";
tab[6][6].color = "chartreuse";
tab[6][3].status = 1;
tab[6][3].color = "chartreuse";

tab[6][1].status = 0;
tab[6][5].status = 0;

tab[5][1].color = "firebrick";
tab[5][5].color = "firebrick";

tab[2][0].color = "snow";
tab[2][6].color = "snow";

tab[1][2].color = "yellow";
tab[1][4].color = "dimGray";

tab[4][0].color = "hotpink";








}

