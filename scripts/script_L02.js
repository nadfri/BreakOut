myCanvas.style.backgroundImage = "url('img/L02.jpg')";
level.textContent = "Level 2";

const nLine = 5; // number of lines
const nCol  = 8; // number of columns
const bricks = new Shape(50,75,70,20,0,"orange"); //(posX,posY,l,h,radius,color)

/*********************Function to unlock next level*******************************/
function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_03", true);  
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
    
    for(let line =0; line<nLine; line++) //number of lines
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
    
//***********Special Bricks******************************************* */
    tab[0][0].status = 0;
    tab[0][7].status = 0;
    tab[4][0].status = 0;
    tab[4][7].status = 0;
    tab[0][3].color  = "hotpink"; 
    tab[2][4].color  = "yellow";    
}
    