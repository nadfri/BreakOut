myCanvas.style.backgroundImage = "url('img/L12.jpg')";
level.textContent = "Level 12";

const nLine = 13; // number of lines
const nCol  = 15; // number of columns
const bricks = new Shape(1,40,38,18,0,"rgba(200,255,200,0.3"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/Fzero.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_13", true);  
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
            tab[line][col].posY   = bricks.posY + (bricks.h+6)*line;
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 3; // add new property 
        }
    }
    
//*************************Special Bricks************************* */
    for(let i=1; i<nLine; i++)
        for(let j=1; j<nCol; j+=2)
            tab[i][j].status = 0;

    for(let i=2; i<nCol-1; i+=2)
    {
        tab[1][i].status = 0;
        tab[2][i].status = 0;
        tab[3][i].status = 0;
        tab[6][i].status = 0;
        tab[9][i].status = 0;
    }


    tab[3][3].status = 1;
    tab[3][3].color = "firebrick";
    
    tab[3][7].status = 1;
    tab[3][7].color = "firebrick";

    tab[3][11].status = 1;
    tab[3][11].color = "firebrick";

    tab[3][nCol-1].status = 1;
    tab[3][nCol-1].color = "firebrick";

    tab[nLine-4][0].status = 1;
    tab[nLine-4][0].color = "firebrick";

    for(i=1;i<nCol-1;i+=2)
    {
        tab[0][i].color = "chartreuse";
        tab[0][i].status = 1;
    }
    

    tab[7][2].color = "black";
    tab[7][2].status = 1;

    tab[7][10].color = "black";
    tab[7][10].status = 1;

    tab[7][nCol-1].color = "black";
    tab[7][nCol-1].status = 1;

    tab[0][nCol-1].color = "yellow";
    tab[0][nCol-1].status = 1;

    tab[nLine-2][nCol-1].color = "dimGray";
    tab[nLine-2][nCol-1].status = 1;

    tab[7][3].color = "hotpink";
    tab[7][3].status = 1;

    tab[10][0].color = "burlyWood";
    tab[10][0].status = 1;

    tab[7][7].color = "darkGreen";
    tab[7][7].status = 1;

    tab[nLine-2][0].color = "darkGreen";
    tab[nLine-2][0].status = 1;

    tab[nLine-4][4].color = "darkGreen";
    tab[nLine-4][4].status = 1;

    tab[3][0].color = "darkGreen";
    tab[3][0].status = 1;

    tab[7][11].color = "powderBlue";
    tab[7][11].status = 1;

    tab[7][0].color = "powderBlue";
    tab[7][0].status = 1;

    tab[nLine-2][4].color = "snow";
    tab[nLine-2][4].status = 1;

    tab[nLine-2][6].color = "purple";
    tab[nLine-2][6].status = 1;

    tab[nLine-1][0].l = 690;
    tab[nLine-1][0].status = 1;
    tab[nLine-1][0].color = "DarkSlateGray";






}