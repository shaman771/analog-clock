
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// set canvas to fit the viewport
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

// set up variables

// clock center
var centX = canvas.width / 2;
var centY = canvas.height / 2;
var faceRadius = centY - 60;

// angles
var hourAngle =  2 * Math.PI / 12;
var minuteAngle = 2 * Math.PI / 60;

// hands
var minuteHand = {
  handLength : faceRadius / 1.45,
  handWidth : 6,
  unitAngle : minuteAngle,
  offset : 15,
  color : "#000",
};
var secondHand = {
  handLength : faceRadius / 1.25,
  handWidth : 3,
  unitAngle : minuteAngle,
  offset : 15,
  color : "#000",
};
var hourHand = {
  handLength : faceRadius / 1.7,
  handWidth : 10,
  unitAngle : hourAngle,
  offset : 3,
  color : "#000",
};

// colors
var faceColor = 0x606b60;
var rimColor = 0x999999;
var canvasColor = 0x111111;
var digitColor = 0x111111;

// main action
blankCanvas('#' + canvasColor.toString(16));
drawClockFace('#' + faceColor.toString(16), '#' + rimColor.toString(16));
drawDigits('#' + digitColor.toString(16));
setInterval(updateClock, 1000);

function updateClock() {
  var currTime = new Date();
  if (updateClock.faceColor && updateClock.faceColor < 0xfefefe) {
    updateClock.faceColor += 0x010101;
  } else {
    updateClock.faceColor = faceColor;
  }

  updateClockFace('#' + updateClock.faceColor.toString(16));
  
  drawDigits("#000");
  drawClockHand(currTime.getHours(), hourHand, currTime.getMinutes() / 60);
  drawClockHand(currTime.getMinutes(), minuteHand);
  drawClockHand(currTime.getSeconds(), secondHand);
}


// blank canvas
function blankCanvas(col) {
  context.fillStyle = col;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// draw clock face
function drawClockFace(fillColor, rimColor) {
  context.strokeStyle = rimColor;
  context.fillStyle = fillColor;
  context.lineWidth = 50;
  //~ context.shadowBlur = 40;
  //~ context.shadowColor = "#fff";
  context.beginPath();
  context.arc(centX, centY, faceRadius, 0, 2 * Math.PI);
  context.stroke();
  context.fill();
}

function updateClockFace(fillColor) {
  //~ context.shadowBlur = "";
  //~ context.shadowColor = "";
  context.fillStyle = fillColor;
  context.strokeStyle = "transparent";
  context.lineWidth = 30;
  context.beginPath();
  context.arc(centX, centY, faceRadius, 0, 2 * Math.PI);
  context.stroke();
  context.fill();
}



// draw digits
function drawDigits(col) {
  var digitX, digitY;
  var digitRadius = faceRadius * .8;
  context.font = faceRadius / 8 + "px Georgia";
  context.fillStyle = col;
  context.textAlign = "center";
  for (var i = 0; i < 12; i++) {
    digitX = centX + digitRadius * Math.cos(hourAngle * i - 2 * hourAngle);
    digitY = centY + context.lineWidth / 3 + digitRadius * Math.sin(hourAngle * i - 2 * hourAngle);
    context.fillText(i + 1, digitX, digitY);
  }
}


// draw clock hand
function drawClockHand(time, params, hourAdj) {

  var handLength = params.handLength || 160;
  var handWidth = params.handWidth || 5;
  var offset = params.offset || 15;
  var unitAngle = params.unitAngle || minuteAngle;
  var color = params.color || "#000";
  var lineCap = params.lineCap || "round";
  var fromX, fromY, toX, toY;
  var angle = unitAngle * time - offset * unitAngle;

  if (hourAdj) {
    angle += unitAngle * hourAdj;
  } 
  
  fromX = centX + handLength / 5 * Math.cos(angle - Math.PI);
  fromY = centY + handLength / 5 * Math.sin(angle - Math.PI);
  toX = centX + handLength * Math.cos(angle);
  toY = centY + handLength * Math.sin(angle);  

  //~ context.shadowBlur = 10;
  //~ context.shadowColor = "#555";
  context.moveTo(fromX, fromY);
  context.lineTo(toX, toY);
  context.lineWidth = handWidth;
  context.lineCap = lineCap;
  context.strokeStyle = color;
  context.stroke();
  //~ context.shadowBlur = 0;
  //~ context.shadowColor = "";
}



