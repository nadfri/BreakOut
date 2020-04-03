myCanvas.style.backgroundImage = "url('img/L05.jpg')";
level.textContent = "Level 5";

const nLine = 15; // number of lines
const nCol  = 7; // number of columns
const bricks = new Shape(35,30,55,20,0,"orange"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/tetris2.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_06", true);  
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
            tab[line][col].posX   = bricks.posX + (bricks.l+40)*col;
            tab[line][col].posY   = bricks.posY + (bricks.h+5)*line;
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 1; // add new property 
        }
    }
    
//*************************Special Bricks************************* */
    for(let i=0; i<nLine;i+=4)
        for (let j=0; j<nCol; j+=3)
            tab[i][j].color = "firebrick";


    tab[11][1].color = "snow";
    tab[11][5].color = "snow";
    tab[14][2].color = "snow";
    tab[14][4].color = "snow";
    tab[nLine-5][3].color = "snow";

    tab[3][3].color = "hotpink";
    tab[7][6].color = "hotpink";

    for(let i=1; i<nLine-1;i+=4)
        for (let j=1; j<nCol; j+=4)
         tab[i][j].color = "dimGray";

    tab[5][0].color  = "yellow";
    tab[5][6].color  = "yellow";
    tab[4][3].color  = "yellow";
    tab[6][3].color  = "yellow";
    tab[14][3].color = "yellow";
    tab[nLine-4][0].color = "yellow";
    tab[nLine-4][nCol-1].color = "yellow";









}

