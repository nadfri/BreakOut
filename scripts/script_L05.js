myCanvas.style.backgroundImage = "url('img/L05.jpg')";
level.textContent = "Level 5";

const nLine = 13; // number of lines
const nCol  = 7; // number of columns
const bricks = new Shape(25,30,50,20,0,"orange"); //(posX,posY,l,h,radius,color)

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
            tab[line][col].posX   = bricks.posX + (bricks.l+50)*col;
            tab[line][col].posY   = bricks.posY + (bricks.h+10)*line;
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 1; // add new property 
        }
    }
    
//*************************Special Bricks************************* */
    for(let i=0; i<nLine;i+=2)
        for (let j=0; j<nCol; j+=2)
            tab[i][j].color = "firebrick";

    for(let i=0; i<nCol; i+=3)
        tab[11][i].color = "firebrick";

    tab[11][1].color = "snow";
    tab[11][5].color = "snow";

    tab[3][3].color = "hotpink";
    tab[7][6].color = "hotpink";

    for(let i=1; i<nLine;i+=4)
        for (let j=1; j<nCol; j+=4)
         tab[i][j].color = "dimGray";

    tab[5][0].color = "yellow";
    tab[5][6].color = "yellow";
    tab[4][3].color = "yellow";
    tab[6][3].color = "yellow";









}

