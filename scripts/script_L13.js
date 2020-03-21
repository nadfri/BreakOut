myCanvas.style.backgroundImage = "url('img/L13.jpg')";
level.textContent = "Level 13";

const nLine = 11; // number of lines
const nCol  = 15; // number of columns
const bricks = new Shape(90,60,30,19,0,"rgba(200,100,50,0.3"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/Fzero.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_14", true);  
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
            tab[line][col].status = 3; // add new property 
        }
    }
    
//*************************Special Bricks************************* */
    for  (let i=1;i<nLine-1;i++)
        tab[i][7].status = 0;



    tab[5][7].color = "red";
    tab[5][7].status = 1;

    tab[nLine-2][3].color = "hotpink";
    tab[nLine-2][3].status = 1;

    tab[nLine-1][0].color = "powderBlue";
    tab[nLine-1][0].status = 1;

    tab[nLine-3][nCol-2].color = "powderBlue";
    tab[nLine-3][nCol-2].status = 1;

    tab[1][nCol-1].color = "chartreuse";
    tab[1][nCol-1].status = 1;

    tab[3][1].color = "chartreuse";
    tab[3][1].status = 1;

    tab[1][0].color = "firebrick";
    tab[1][0].status = 1;

    tab[5][nCol-1].color = "firebrick";
    tab[5][nCol-1].status = 1;










}