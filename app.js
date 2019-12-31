//setting canvas
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const CANVAS_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width  = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
//initial
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
//pen color
ctx.strokeStyle = CANVAS_COLOR;
ctx.fillStyle = CANVAS_COLOR;
//pen size
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }

}
function handleColorCliked(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleMode(){
    if(filling === true){
        filling = false;
        mode.innerText = "fill";
    }else{
        filling = true;
        mode.innerText = "paint";
    }
}

function fillCanvas(){
    if(filling === true){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    };
}

function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const imageUrl = canvas.toDataURL()
    const link = document.createElement("a");
    link.href = imageUrl;
    const timeStamp = new Date();
    const timeS =`${timeStamp.getHours()}${timeStamp.getMinutes()}${timeStamp.getSeconds()}`;
    link.download = `image_${timeS}`;
    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",fillCanvas);
    canvas.addEventListener("contextmenu",handleCM);
}
Array.from(colors).forEach(color =>
    color.addEventListener("click",handleColorCliked)
    );
if(range){
    range.addEventListener("input",handleRange);
}
if(mode){
    mode.addEventListener("click",handleMode);
}
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}