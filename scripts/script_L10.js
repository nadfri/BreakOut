myCanvas.style.backgroundImage = "url('img/L10.jpg')";
level.textContent = "Level 10";

const nLine = 19; // number of lines
const nCol  = 11; // number of columns
const bricks = new Shape(20,40,55,15,0,"orange"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/castlevania.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_11", true);  
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
            tab[line][col].posX   = bricks.posX + (bricks.l+5)*col;
            tab[line][col].posY   = bricks.posY + (bricks.h+5)*line;
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 1; // add new property 
        }
    }
    
//*************************Special Bricks************************* */
   for(let i=10; i<nLine-1; i++)
   {
        tab[i][1].status = 0;
        tab[i][9].status = 0;

        tab[i][4].status = 0;
        tab[i][5].status = 0;
        tab[i][6].status = 0;
   }

   for(let i=1; i<10; i++)
        tab[i][5].status = 0;
    
    tab[18][5].status = 0;


    tab[0][5].color = "hotpink";
    tab[0][1].color = "purple";
    tab[0][9].color = "purple";

    tab[1][4].color = "darkGreen";
    tab[1][6].color = "darkGreen";
    tab[1][0].color = "firebrick"; tab[1][10].color = "firebrick";
    tab[1][2].color = "black";
    tab[1][9].color = "black";

    tab[3][0].color = "firebrick"; tab[3][10].color = "firebrick";

    tab[4][1].color = "firebrick";
    tab[4][3].color = "firebrick";
    tab[4][5].color = "firebrick";
    tab[4][7].color = "firebrick";
    tab[4][9].color = "firebrick";

    tab[5][0].color = "firebrick"; tab[5][10].color = "firebrick";
    tab[5][1].color = "black";
    tab[5][9].color = "black";

    tab[6][8].color = "chartreuse";
    tab[6][10].color = "chartreuse";
    tab[6][6].color = "chartreuse";
    tab[6][4].color = "chartreuse";
    tab[6][2].color = "chartreuse";
    tab[6][0].color = "chartreuse";

    tab[7][0].color = "firebrick"; tab[7][10].color = "firebrick";

    tab[8][0].color = "chartreuse";
    tab[8][2].color = "chartreuse";
    tab[8][4].color = "chartreuse";
    tab[8][6].color = "chartreuse";
    tab[8][8].color = "chartreuse";
    tab[8][10].color = "chartreuse";

    tab[9][1].color = "hotpink";
    tab[9][9].color = "hotpink";

    tab[10][3].color = "darkGreen";
    tab[10][7].color = "darkGreen";
    tab[10][0].color = "snow";
    tab[10][2].color = "snow";
    tab[10][8].color = "snow";
    tab[10][10].color = "snow";

    tab[11][3].color = "firebrick";
    tab[11][7].color = "firebrick";
    tab[11][0].color = "black";
    tab[11][10].color = "black";

    tab[13][0].color = "darkGreen";
    tab[13][10].color = "darkGreen";
    tab[13][3].color = "firebrick";
    tab[13][7].color = "firebrick";

    tab[15][3].color = "firebrick";
    tab[15][7].color = "firebrick";
    tab[15][2].color = "darkGreen";
    tab[15][9].color = "darkGreen";
    tab[15][0].color = "burlyWood";
    tab[15][10].color = "burlyWood";

    tab[17][2].color = "snow";
    tab[17][8].color = "snow";
    tab[17][3].color = "dimGray";
    tab[17][7].color = "dimGray";
    tab[17][0].color = "burlyWood";
    tab[17][10].color = "burlyWood";

    tab[18][1].color = "yellow";
    tab[18][9].color = "yellow";
    tab[18][4].color = "snow";
    tab[18][6].color = "snow";
    tab[18][2].color = "purple";
    tab[18][8].color = "purple";
    tab[18][0].color = "black";
    tab[18][10].color = "black";



}

