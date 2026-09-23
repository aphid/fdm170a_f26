let canvas = document.querySelector("canvas");

ctx = canvas.getContext("2d");

function drawLine(x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}
ctx.strokeStyle = "rgba(0,0,0,0.5)";


let distance = 120; //166 ppi on my screen

//horizont
let ttop = (canvas.height / 2) - distance;
let bottom = (canvas.height / 2) + distance;
let line1 = { x0: 0, y0: ttop, x1: canvas.width, y1: ttop };
let line2 = { x0: 0, y0: bottom, x1: canvas.width, y1: bottom };
drawBand(line1, line2);  //hor
ctx.strokeStyle = "blue";

//vert
let left = (canvas.width / 2) - distance;
let right = (canvas.width / 2) + distance;
line1 = { x0: left, y0: 0, x1: left, y1: canvas.height };
line2 = { x0: right, y0: 0, x1: right, y1: canvas.height };
drawBand(line1, line2); //vert


ctx.lineWidth = 1;
ctx.strokeStyle = "green";



//makes up for being extra wide on account of diagonal
let offset = distance * 0.7;

line1 = { x0: 0 - offset, y0: canvas.height - offset, x1: canvas.width - offset, y1: 0 - offset };
line2 = { x0: 0 + offset, y0: canvas.height + offset, x1: canvas.width + offset, y1: 0 + offset };

drawBand(line1, line2); //diag



//draws two lines (input as objects) and then bands between them
function drawBand(line1, line2) {
    let density = 32;
    drawLine(line1.x0, line1.y0, line1.x1, line1.y1);
    drawLine(line2.x0, line2.y0, line2.x1, line2.y1);
    for (let i = 0; i < 100; i += (100/density)) {
        let c1 = partial(line1, i);
        let c2 = partial(line2, i);
        drawLine(c1.x, c1.y, c2.x, c2.y);
    }


}

//returns coordinates of point at a certain % along a line
function partial(line, pct) {
    let x = line.x0 + (line.x1 - line.x0) * pct / 100;
    let y = line.y0 + (line.y1 - line.y0) * pct / 100;
    return { x: x, y: y };
}
