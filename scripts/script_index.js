window.onload = () =>{
    "use strict";
/*****************************Start of onload**********************/

div_01.onclick = () => {document.location = "level_01.html"};

const tabStorage = 
[
    {local : localStorage.getItem("level_02"), div : div_02, html : "level_02.html"},
    {local : localStorage.getItem("level_03"), div : div_03, html : "level_03.html"},
    {local : localStorage.getItem("level_04"), div : div_04, html : "level_04.html"},
    {local : localStorage.getItem("level_05"), div : div_05, html : "level_05.html"},
    {local : localStorage.getItem("level_06"), div : div_06, html : "level_06.html"},
    {local : localStorage.getItem("level_07"), div : div_07, html : "level_07.html"},
    {local : localStorage.getItem("level_08"), div : div_08, html : "level_08.html"},
    {local : localStorage.getItem("level_09"), div : div_09, html : "level_09.html"},
    {local : localStorage.getItem("level_10"), div : div_10, html : "level_10.html"},
    {local : localStorage.getItem("level_11"), div : div_11, html : "level_11.html"},
    {local : localStorage.getItem("level_12"), div : div_12, html : "level_12.html"},
    {local : localStorage.getItem("level_13"), div : div_13, html : "level_13.html"},
    {local : localStorage.getItem("level_14"), div : div_14, html : "level_14.html"},
    {local : localStorage.getItem("level_15"), div : div_15, html : "level_15.html"},
    {local : localStorage.getItem("level_16"), div : div_16, html : "level_16.html"},
    {local : localStorage.getItem("level_17"), div : div_17, html : "level_17.html"},
    {local : localStorage.getItem("level_18"), div : div_18, html : "level_18.html"},
    {local : localStorage.getItem("level_19"), div : div_19, html : "level_19.html"},
    {local : localStorage.getItem("level_20"), div : div_20, html : "level_20.html"}
]

for (let item of tabStorage)
{
    if(item.local =="true") 
    {
        item.div.className = "box unlocked";
        item.div.onclick = () => {document.location = item.html};
    }
}


    




        















/*****************************End of onload**********************/
};