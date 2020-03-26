myCanvas.style.backgroundImage = "url('img/L16.jpg')";
level.textContent = "Level 16";

const nLine = 12; // number of lines
const nCol  = 11; // number of columns
const bricks = new Shape(60,45,51,18,0,"rgba(80,50,50,0.7)"); //(posX,posY,l,h,radius,color)
music.src    = "sounds/offroad.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_17", true);  
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
                        "purple","black","cyan"
                        ]; 
  
    
    for(let line = 0; line<nLine; line++) //number of lines
    {
        tab[line] = []; //create array of array
    
        for (let col=0; col<nCol; col++) //number of columns
        {	
            tab[line][col]        = Object.create(bricks); //each array is a brick objet
            tab[line][col].posX   = bricks.posX + (bricks.l+7)*col;
            tab[line][col].posY   = bricks.posY + (bricks.h+7)*line;
            //tab[line][col].stroke = "transparent";
            //tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 4; // add new property 
            tab[line][col].stroke = "red";
        }
    }
    
//*************************Special Bricks************************* */



}