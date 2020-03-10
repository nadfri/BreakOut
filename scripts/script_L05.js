myCanvas.style.backgroundImage = "url('img/L05.jpg')";
level.textContent = "Level 5";

const nLine = 1; // number of lines
const nCol  = 1; // number of columns
const bricks = new Shape(20,50,70,20,0,"orange"); //(posX,posY,l,h,radius,color)

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_06", true);  
}

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
    
    //*************************Special Bricks************************* */
    
    };

