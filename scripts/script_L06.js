myCanvas.style.backgroundImage = "url('img/L06.jpg')";
level.textContent = "Level 6";

const nLine = 9; // number of lines
const nCol  = 11; // number of columns
const bricks = new Shape(40,30,50,40,0,"orange"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/tetris2.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_07", true);  
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
    for(let i=0; i<nLine; i++)
        tab[i][5].status = 0;
    
    for(let i=1; i<nLine-1; i++)
    { 
        tab[i][4].color = "firebrick";
        tab[i][6].color = "firebrick";
    }

    for(let i=0; i<nCol; i++)
        tab[8][i].color = "firebrick";

    tab[0][4].color = "dimGray";
    tab[0][6].color = "dimGray";

    tab[7][3].color = "yellow";
    tab[7][7].color = "yellow";

    tab[4][2].color = "hotpink";

    tab[8][2].color = "snow";
    tab[8][9].color = "cyan";
    tab[6][1].color = "snow";

    tab[4][8].color = "chartreuse";
    tab[3][1].color = "chartreuse";
    tab[0][0].color = "chartreuse";
    tab[0][10].color = "chartreuse";







}

