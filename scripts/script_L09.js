myCanvas.style.backgroundImage = "url('img/L09.jpg')";
level.textContent = "Level 9";

const nLine = 9; // number of lines
const nCol  = 14; // number of columns
const bricks = new Shape(05,80,40,20,0,""); //(posX,posY,l,h,radius,color)
music.src    = "sounds/tetris2.mp3";

function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_10", true);  
}

/************************Creation of Bricks**************************************/
function createBricks(tab)
{
    const tabColours = ["royalBlue","rgba(47, 27, 12, 0.7)",
                        "rgba(47, 27, 12, 0.7)",
                        "burlyWood","snow","rgba(47, 27, 12, 0.7)",
                        "chartreuse","rgba(47, 27, 12, 0.7)",
                        "firebrick","rgba(47, 27, 12, 0.7)",
                        "rgba(47, 27, 12, 0.7)", "rgba(47, 27, 12, 0.7)","rgba(47, 27, 12, 0.7)",
                        "purple","rgba(47, 27, 12, 0.7)"
                        ]; 
  
    
    for(let line = 0; line<nLine; line++) //number of lines
    {
        tab[line] = []; //create array of array
    
        for (let col=0; col<nCol; col++) //number of columns
        {	
            tab[line][col]        = Object.create(bricks); //each array is a brick objet
            tab[line][col].posX   = bricks.posX + (bricks.l+10)*col;
            tab[line][col].posY   = bricks.posY + (bricks.h+6)*line;
            tab[line][col].color  = tabColours[Math.round(Math.random()*tabColours.length)];
            tab[line][col].status = 1; // add new property 
        }
    }
    
//*************************Special Bricks************************* */
    for(let i=0; i<nLine; i++)
        for(let j=2; j<nCol; j+=3)
        tab[i][j].status = 0;

    tab[2][3].color = "hotpink";
    tab[5][6].color = "yellow";
    tab[8][9].color = "dimGray";
    tab[4][7].color = "darkGreen";
    tab[4][3].color = "black";










}

