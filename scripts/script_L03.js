myCanvas.style.backgroundImage = "url('img/L03.jpg')";
level.textContent = "Level 3";

const nLine = 7; // number of lines
const nCol  = 9; // number of columns
const bricks = new Shape(40,60,65,20,0,"orange"); //(posX,posY,l,h,radius,color)

/*********************Function to unlock next level*******************************/
function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_04", true);  
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

//**********************Special Bricks**********************************************/
    tab[0][3].color  = "hotpink"; 
    tab[2][4].color  = "yellow";
    for (let line =1; line<6 ;line++)
        for(let col =1; col<8; col++)
            tab[line][col].status = 0;
    
    tab[0][8].color  = "yellow";

    tab[3][4].color  = "yellow";
    tab[3][4].status = 1;

    tab[1][1].color  = "dimGray";
    tab[1][1].status = 1;
    
    tab[5][1].color  = "dimGray";
    tab[5][1].status = 1; 
    
    tab[1][7].color  = "dimGray";
    tab[1][7].status = 1; 
    
    tab[5][7].color  = "dimGray";
    tab[5][7].status = 1;     

}