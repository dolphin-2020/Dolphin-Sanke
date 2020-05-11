var mapArray = new Array();
var mapX = 40;
var mapY = 20;
var snakeX = [1, 2, 3];
var snakeY = [0, 0, 0]
var foodX = 2;
var foodY = 3;
var KCode = 39;
var move;
window.onload = function () {
  createMap();
  createSnake();
  createFood();
  move = setInterval(snakeMove, 300);
  document.onkeydown = keyDown;
}
/////////////////////////
function snakeMove() {
  cleanSnake();
  for (var i = 0; i < snakeX.length - 1; i++) {
    snakeX[i] = snakeX[i + 1];
    snakeY[i] = snakeY[i + 1];
  }
  switch (KCode) {
    case 37://left
      snakeX[snakeX.length - 1]--;
      break;
    case 38://
      snakeY[snakeX.length - 1]--;
      break;
    case 39:
      snakeX[snakeX.length - 1]++;
      break;
    case 40:
      snakeY[snakeX.length - 1]++;
      break;
  }

  if (eat()) {
    snakeX.push(snakeX[snakeX.length - 1]);
    snakeY.push(snakeY[snakeX.length - 1]);

    for (var i = snakeX.length - 1; i > 0; i--) {
      snakeX[i] = snakeX[i - 1];
      snakeY[i] = snakeY[i - 1];
    }
    createFood();
  }

   for(var i=0;i<snakeX.length-1;i++){
     if(snakeX[i]===snakeX[snakeX.length-1]&&snakeY[i]===snakeY[snakeX.length-1]){
       clearInterval(move);
       alert("Game Over")
       return;
     }
   }

  if(snakeX[snakeX.length-1]<0||snakeX[snakeX[snakeX.length-1]>mapX-1]||
    snakeY[snakeX.length-1]<0||snakeY[snakeX.length-1]>mapY-1){
      alert("Game Over")
      return;
    }

  createSnake();
}

function eat() {
  if (snakeX[snakeX.length - 1] === foodX && snakeY[snakeX.length - 1] === foodY) {
    return true;
  } else {
    return false;
  }
}
////////////////////////////
function cleanSnake() {
  for (var i = 0; i < snakeX.length; i++) {
    var x = snakeX[i];
    var y = snakeY[i];
    mapArray[y][x].className = "map";
  }
}
//////////////////////////
function createSnake() {
  for (var i = 0; i < snakeX.length; i++) {
    var x = snakeX[i];
    var y = snakeY[i]
    mapArray[y][x].className = "snake"
  }
}
/////////////////////////
function createFood() {
  var r = false;
  do {
    r = false;
    foodX = parseInt(Math.random() * mapX);
    foodY = parseInt(Math.random() * mapY);
    for (var i = 0; i < snakeX.length; i++) {
      if (snakeX[i] === foodX && snakeY[i] === foodY) {
        r = true;
        break;
      }
    }
  } while (r);

  mapArray[foodY][foodX].className = "food";
}
//////////////////////////
function keyDown(e) {
  let k = (window.event) ? e.which : e.KeyCode;
  if (KCode === 37 && k === 39 || KCode === 39 && k === 37 ||
    KCode === 38 && k === 40 || KCode === 40 && k === 38) {
    return;
  }
  var r = KCode - k;
  if (r === 2 || r === -2) {
    return;
  }
  KCode = k;
}
///////////////////////////
function createMap() {
  for (var y = 0; y < mapY; y++) {
    mapArray[y] = new Array();
    for (var x = 0; x < mapX; x++) {
      var div = document.createElement("div");
      div.className = "map";
      mapArray[y][x] = div;
      document.getElementById("main").appendChild(div);
    }
  }
}
