let canvas = document.querySelector("canvas");

let ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.moveTo(100, 200);
ctx.lineTo(400, 0);
ctx.moveTo(canvas.width / 2, canvas.height / 2);
ctx.lineTo(canvas.width / 2, canvas.height);
ctx.stroke();
ctx.closePath();

ctx.strokeStyle = "rgb(25,200,10)";



function drawLine(x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
}
/*
drawLine(100,100,300,300);

for (let i=0; i < 50; i++){
    drawLine(canvas.width/2,canvas.height/2,canvas.width/50 * i, 0);
}

for (let i=0; i < 50; i++){
  	let color = "rgb(" + rando(0,255) + "," + rando(0,255) + "," + rando(0,255) + ")";
 	ctx.strokeStyle = color;
    drawLine(canvas.width/2,canvas.height/2,rando(0,canvas.width),rando(0,canvas.height));
}

function rando(min, max) {
    return Math.random() * (max - min) + min;
}
*/