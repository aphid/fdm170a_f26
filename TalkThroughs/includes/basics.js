let canvas = document.querySelector("canvas");

let ctx = canvas.getContext("2d");

ctx.fillStyle = 'green';

ctx.fillRect(300, 300, 30, 30);

ctx.ellipse(250, 250, 50, 75, Math.PI / 3, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.arc(400, 75, 50, 0, 1 * Math.PI);
ctx.lineWidth = 4;

ctx.strokeStyle = "red";
ctx.stroke();

ctx.fillStyle = 'black';


ctx.strokeStyle = "orange";
ctx.lineWidth = 13;
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.lineTo(100, 200);

ctx.stroke();
ctx.fill();