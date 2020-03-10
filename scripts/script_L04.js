myCanvas.style.backgroundImage = "url('img/L04.jpg')";
level.textContent = "Level 4";

const nLine = 7; // number of lines
const nCol  = 9; // number of columns
const bricks = new Shape(20,60,70,20,0,"orange"); //(posX,posY,l,h,radius,color)

/*********************Function to unlock next level*******************************/
function unlockNextLevel()
{
    document.onkeypress = (e) => {if(e.key == " ") document.location = "./index.html";};
    localStorage.setItem("level_05", true);  
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

//************************Special Bricks*******************************************/
    tab[0][0].status = 0; 
    tab[0][1].status = 0;
    tab[0][2].status = 0;
    tab[0][6].status = 0;
    tab[0][7].status = 0;
    tab[0][8].status = 0;

    tab[1][0].status = 0; 
    tab[1][1].status = 0;
    tab[1][7].status = 0;
    tab[1][8].status = 0;


    tab[5][0].status = 0; 
    tab[5][1].status = 0;
    tab[5][7].status = 0;
    tab[5][8].status = 0;

    tab[2][0].status = 0;
    tab[2][8].status = 0; 

    tab[4][0].status = 0;
    tab[4][8].status = 0; 

    tab[6][0].status = 0; 
    tab[6][1].status = 0;
    tab[6][2].status = 0;
    tab[6][6].status = 0;
    tab[6][7].status = 0;
    tab[6][8].status = 0;

    tab[3][0].color  = "firebrick";
    tab[3][8].color  = "firebrick";
    tab[6][4].color  = "firebrick";
    tab[0][4].color  = "firebrick";

    tab[3][2].color  = "snow";
    tab[3][6].color  = "snow";
    tab[1][4].color  = "snow";

    tab[3][4].color  = "hotpink";

    tab[2][4].color  = "yellow";
    tab[5][4].color  = "yellow";
    tab[4][4].color  = "dimGray";
    tab[6][3].color  = "dimGray";
    tab[6][5].color  = "dimGray";

}