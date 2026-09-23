let canvas = document.querySelector("canvas");

ctx = canvas.getContext("2d");

function drawLine(x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

ctx.strokeStyle = "rgba(0,0,0,0.5)";


function horizontalBand() {
    let top = canvas.height / 2 - 100;
    let bottom = canvas.height / 2 + 100;

    //draw top line;
    drawLine(0, top, canvas.width, top);
    //draw bottom line
    drawLine(0, bottom, canvas.width, bottom);

    let total = canvas.width / 8;
    for (let i = 0; i < total; i++) {
        let x = i * (canvas.width / total);
        drawLine(x, top, x, bottom);
    }

}

function verticalBand() {
    let left = canvas.width / 2 - 100;
    let right = canvas.width / 2 + 100;

    //draw top line;
    drawLine(left, 0, left, canvas.height);
    //draw bottom line
    drawLine(right, 0, right, canvas.height);

    let total = canvas.height / 8;

    for (let i = 0; i < total; i++) {
        let y = i * (canvas.height / total);
        drawLine(left, y, right, y);
    }
}

///ughhhh
function diagonalBand() {
    //first line

    drawLine(0, 100, canvas.width - 100, canvas.height);
    drawLine(100, 0, canvas.width, canvas.height - 100);

    //drawLine(10,0,10,106);
    //drawLine(20,0,20,112);

    drawLine(0, 10, 10, 0);
    drawLine(0, 20, 20, 0);
    drawLine(0, 30, 30, 0);
    drawLine(0, 40, 40, 0);


    drawLine(110, 10, 10, 110);
    //trying out a couple things
    for (let i = -20; i < 40; i++) {
        drawLine(i * 10, i * 4, i * 4, i * 10);
        drawLine(i + 100, i, i, i + 100);
    }
    //ahh it was almost so elegant
    for (let i = 0; i < 15; i++) {
        drawLine(0, i, i * 10, 0);
    }


} //end of function
diagonalBand();
verticalBand();
horizontalBand();
