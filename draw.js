var mouseX = 0,
    mouseY = 0;
var mouseXSlow = 0,
    mouseYSlow = 0;
var mouseXLast = 0,
    mouseYLast = 0;
var mouseXLastSlow = 0,
    mouseYLastSlow = 0;
var canvas = $('canvas').get(0);
var ctx = canvas.getContext('2d');
var timeLast = new Date();
var timeLastSlow = timeLast;
var slowCounter = 0;
var enTimer;
var INTERVAL = 15; // ms
var SPM = -INTERVAL/28.6 + 4; // Slow predictor multiplier
var SLOW_MULTIPLIER = 6; // x
var CLEAR = false;

ctx.globalAlpha = .2;
ctx.lineWidth = 1;
ctx.lineCap = 'round';

function drawer() {
    var time = new Date();
    var dt = time - timeLast;
    var dx = mouseX - mouseXLast;
    var dy = mouseY - mouseYLast;
    var timeSlow;
    slowCounter += 1;
    if (slowCounter >= SLOW_MULTIPLIER) {
        slowCounter = 0;
        timeSlow = time;
        mouseXSlow = mouseX;
        mouseYSlow = mouseY;
        /*
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.arc(mouseXLastSlow, mouseYLastSlow, 12, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = 'orange';
        ctx.arc(mouseXSlow, mouseYSlow, 9, 0, 2 * Math.PI);
        ctx.stroke();*/
        mouseXLastSlow = mouseXSlow;
        mouseYLastSlow = mouseYSlow;
        timeLastSlow = timeSlow;
    }
    if (CLEAR) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    /*
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.arc(mouseXLast, mouseYLast, 6, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.arc(mouseX, mouseY, 3, 0, 2 * Math.PI);
    ctx.globalAlpha = 0.3;
ctx.stroke();*/
    if (!(dx === 0 && dy === 0)) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        //ctx.arc(mouseX+3*(mouseX-mouseXLast), mouseY+3*(mouseY-mouseYLast), 1, 0, 2 * Math.PI);
        //ctx.moveTo(mouseXLast, mouseYLast);
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(mouseX+SPM*(mouseX-mouseXLast), mouseY+SPM*(mouseY-mouseYLast));
        ctx.stroke();
    }

    mouseXLast = mouseX;
    mouseYLast = mouseY;
    timeLast = time;
}

function doMouseEnter(e) {
    enTimer = setInterval(drawer, INTERVAL);
    slowCounter = 0;
    timeLast = new Date();
    timeLastSlow = timeLast;
    mouseXLast = e.pageX;
    mouseYLast = e.pageY;
    mouseXLastSlow = mouseXLast;
    mouseYLastSlow = mouseYLast;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function doMouseOut(e) {
    clearInterval(enTimer);
} // TODO: On window leave/unfocus do this too!

function doMouseMove(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
}

canvas.addEventListener("mouseenter", doMouseEnter, false);
canvas.addEventListener("mouseout", doMouseOut, false);
canvas.addEventListener("mousemove", doMouseMove, false);
