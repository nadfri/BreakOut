myCanvas.style.backgroundImage = "url('img/L11.jpg')";
level.textContent = "Level 11";

const nLine = 9; // number of lines
const nCol  = 9; // number of columns
const bricks = new Shape(35,40,65,20,0,"orange"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/Fzero.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_12", true);  
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
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 1; // add new property 
        }
    }
    
//*************************Special Bricks************************* */
  
    for(let i=0; i<nCol; i++)
        {
            tab[8][i].status = 2;
            tab[8][i].color  = "transparent";

            tab[0][i].status = 2;
            tab[0][i].color  = "transparent";
        }

    for(let i=1; i<nLine-1; i++)
        {
            tab[i][0].status = 2;
            tab[i][0].color  = "transparent";

            tab[i][8].status = 2;
            tab[i][8].color  = "transparent";
        }

    tab[4][4].color = "hotpink";

    tab[7][1].color = "chartreuse";
    tab[7][7].color = "chartreuse";
    tab[1][1].color = "chartreuse";
    tab[1][7].color = "chartreuse";

    tab[4][1].color = "black";
    tab[4][7].color = "black";
    tab[1][4].color = "black";
    tab[7][4].color = "black";

    tab[2][1].color = "burlyWood";
    tab[2][7].color = "burlyWood";

    tab[6][1].color = "purple";
    tab[6][7].color = "purple";

    tab[2][4].color = "yellow";

    tab[3][4].color = "dimGray";

    tab[5][4].color = "firebrick";
    tab[6][4].color = "firebrick";

    tab[4][5].color = "darkGreen";

    tab[4][3].color = "snow";


}

