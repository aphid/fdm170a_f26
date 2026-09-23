let canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");

function drawLine(x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}
ctx.strokeStyle = "rgba(0,0,0,0.5)";

//left edge of band? i say horizontal but its VERTICAL
drawLine(200,0,200,canvas.height);

//right edge of band?
drawLine(400,0,400,canvas.height);

//lines
drawLine(200,0,400,0);
drawLine(200,10,400,10);
drawLine(200,20,400,20);
drawLine(200,30,400,30);
drawLine(200,40,400,40);
drawLine(200,50,400,50);


//top edge of band?
drawLine(0,200,canvas.width,200);

//bottom
drawLine(0,400,canvas.width,400);



//diagonal?
drawLine(0,10,canvas.width,200);
drawLine(0,210,canvas.width,410);

//bands?
///oh no.
drawLine(10,12,10,212);
drawLine(20,14,20,214);
drawLine(30,16,30,216);
drawLine(40,18,40,218);

//or wait, should the bands be kinda angled? uhh i could eyeball it.

//does this even count as intersecting?!