myCanvas.style.backgroundImage = "url('img/L08.jpg')";
level.textContent = "Level 8";

const nLine = 5; // number of lines
const nCol  = 9; // number of columns
const bricks = new Shape(40,20,65,51,0,"rgba(0,0,1,0.5)"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/tetris2.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_09", true);  
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
   


    tab[4][8].color = "firebrick";  tab[4][7].color = "purple";
    tab[4][4].color = "snow     ";  tab[4][1].color = "purple";
    tab[2][0].color = "firebrick";  tab[2][7].color = "purple";
    tab[2][8].color = "firebrick";  tab[2][1].color = "purple";
    tab[4][0].color = "firebrick";

    tab[0][0].color = "dimGray";
    tab[0][8].color = "yellow";

    tab[0][4].color = "burlyWood";

    tab[2][4].color = "chartreuse";






}

