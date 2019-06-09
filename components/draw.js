// Global Variables
var canvas = document.getElementById('BOCanvas'); // Select Canvas
var ctx = canvas.getContext('2d'); // Ctx = 2d spectrum of Canvas
var interval = setInterval(draw, 10);

// Ball location variables
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//Paddle Controls
var rightPressed = false;
var leftPressed = false;
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

//Draw Ball Variables
var ballRadius = 10;

// Draw Paddle Variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// Brick Grid Variables
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75; 
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Brick Array Builder
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
//====================================================================================================================================================//

function draw() { // Refreshes the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears whole canvas every frame
    drawBall(); // Draw Ball Component call
    drawPaddle(); // Draw Paddle Component call
    drawBricks(); // Draw the Brick Grid
    collisionDetection(); // Call collision detection
    y+=dy;
    x+=dx;

    // Bounce off walls
    if (y + dy < ballRadius) {
        dy = -dy;
    } 
    else if (y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert('Game Over!');
            document.location.reload();
            clearInterval(interval); // End Game
        }
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


// Draw Ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// Draw Paddle
function drawPaddle () {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095D';
    ctx.fill();
    ctx.closePath();
}

// Draw Bricks
function drawBricks() {
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c*( brickWidth + brickPadding )) + brickOffsetLeft;
                var brickY = (r*( brickHeight + brickPadding )) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Paddle Handlers
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


// Collision Detection
function collisionDetection() {
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            // Maths
            if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status = 0;
            }
        }
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