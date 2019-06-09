var canvas = document.getElementById('BOCanvas'); // Select Canvas
var ctx = canvas.getContext('2d'); // Ctx = 2d spectrum of Canvas

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

function draw() { // Refreshes the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears whole canvas every frame
    drawBall(); // Draw Ball Component call
    drawPaddle(); // Draw Paddle Component call
    y+=dy;
    x+=dx;

    // Bounce off walls
    if (y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
        dy = -dy;
    }

    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
        dx = -dx;
    }

    // Paddle Movement
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}
setInterval(draw, 10);

//Draw Ball
var ballRadius = 10;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// Draw Paddle
var paddleHeight = 10;
var paddleWidth = 75;

var paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle () {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095D';
    ctx.fill();
    ctx.closePath();
}

//Paddle Controls
var rightPressed = false;
var leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler (e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } 
    else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler (e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } 
    else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}





//====================================================================================================================================================//
// //Square
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = '#FF0000';
// ctx.fill();
// ctx.closePath();

// //Circle
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = 'Green';
// ctx.fill();
// ctx.closePath();

// //Empty Rectangle
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
// ctx.stroke();
// ctx.closePath();