window.onload = () =>{
    "use strict";
/*****************************Start of onload**********************/

div_01.onclick = () => {document.location = "level_01.html"};





const tabStorage = 
[
    {local : localStorage.getItem("level_02"), div : div_02},
    {local : localStorage.getItem("level_03"), div : div_03},
    {local : localStorage.getItem("level_04"), div : div_04},
    {local : localStorage.getItem("level_05"), div : div_05},
    {local : localStorage.getItem("level_06"), div : div_06},
    {local : localStorage.getItem("level_07"), div : div_07},
    {local : localStorage.getItem("level_08"), div : div_08},
    {local : localStorage.getItem("level_09"), div : div_09},
    {local : localStorage.getItem("level_10"), div : div_10},
    {local : localStorage.getItem("level_11"), div : div_11},
    {local : localStorage.getItem("level_12"), div : div_12},
    {local : localStorage.getItem("level_13"), div : div_13},
    {local : localStorage.getItem("level_14"), div : div_14},
    {local : localStorage.getItem("level_15"), div : div_15},
    {local : localStorage.getItem("level_16"), div : div_16},
    {local : localStorage.getItem("level_17"), div : div_17},
    {local : localStorage.getItem("level_18"), div : div_18},
    {local : localStorage.getItem("level_19"), div : div_19},
    {local : localStorage.getItem("level_20"), div : div_20}
]

for (let item of tabStorage)
    if(item.local) item.div.className = "box unlocked";




        















/*****************************End of onload**********************/
};