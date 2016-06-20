g = new Game ("0000000420042000")
console.log(g.currentBoard)

$(document).on('keyup',function(e){
  if(e.which==38) {
    console.log("up");
    g.up();
  };
  if(e.which==39) {
    console.log("right");
    g.right();
  };
  if(e.which==40) {
    console.log("down");
    g.down();
  };
  if(e.which==37) {
    console.log("left");
    g.left();
  };
  if (g.currentBoard.includes("0")) {
    g.spawnBlock()
    console.log(g.currentBoard)
  }
});


String.prototype.replaceAt=function(index, character) {
  return this.substr(0, index) + character + this.substr(index+character.length);
}

function Game(startingBoard) {
  this.startingBoard = startingBoard || boardGenerator();
  this.currentBoard = this.startingBoard
}

function boardGenerator() {
  result = "";
  var idx1 = Math.floor(Math.random() * 16);
  var idx2 = Math.floor(Math.random() * 16);
  for(var i = 0; i < 16; i ++) {
    if (i == idx1 || i == idx2) { result += "2"; }
    else { result += "0"; }
  }
  return result;
}

Game.prototype.spawnBlock = function() {
  board = this.currentBoard;
  var idx = "";
  var newBoard = "";
  while (idx == "") {
    idx = Math.floor(Math.random() * 16);
    if (board[idx] != 0){ idx = ""};
  }
  for (var i=0; i < 16; i++) {
    if (i == idx)  { newBoard += "2"; }
    else { newBoard += board[i];}
  }
  this.currentBoard = newBoard;
}


Game.prototype.up = function() {
  this.moveUp();
  this.clearUp();
  this.clearUp();
  this.clearUp();
}

Game.prototype.moveUp = function() {
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      if ((j % 4 == i % 4) && ((j/4)-(i/4) == -1) && (i != j) && this.currentBoard[j] != "0" && this.currentBoard[i] != "0" && this.currentBoard[i] == this.currentBoard[j]) {
        this.currentBoard = this.currentBoard.replaceAt(j, (String(Number(this.currentBoard[j]) * 2)));
        this.currentBoard = this.currentBoard.replaceAt(i, "0");
      }
    }
  }
}

Game.prototype.clearUp = function() {
  for (var i = 0; i < 16; i++) {
    if ((i/4 < 3) && (this.currentBoard[i] == 0) && (this.currentBoard[i+4] != 0)) {
      this.currentBoard = this.currentBoard.replaceAt(i, this.currentBoard[i+4])
      this.currentBoard = this.currentBoard.replaceAt((i+4), "0")
    }
  }
}

Game.prototype.down = function() {
  this.moveDown();
  this.clearDown();
  this.clearDown();
  this.clearDown();
}

Game.prototype.moveDown = function() {
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      if ((j % 4 == i % 4) && ((j/4)-(i/4) == 1) && (i != j) && this.currentBoard[j] != "0" && this.currentBoard[i] != "0" && this.currentBoard[i] == this.currentBoard[j]) {
        this.currentBoard = this.currentBoard.replaceAt(j, (String(Number(this.currentBoard[j]) * 2)));
        this.currentBoard = this.currentBoard.replaceAt(i, "0");
      }
    }
  }
}

Game.prototype.clearDown = function() {
  for (var i = 0; i < 16; i++) {
    if (Math.floor(i/4) > 0 && (this.currentBoard[i] == 0) && (this.currentBoard[i-4] != 0)) {
      this.currentBoard = this.currentBoard.replaceAt(i, this.currentBoard[i-4])
      this.currentBoard = this.currentBoard.replaceAt((i-4), "0")
    }
  }
}

Game.prototype.left = function() {
  this.moveLeft();
  this.clearLeft();
  this.clearLeft();
  this.clearLeft();
}

Game.prototype.moveLeft = function() {
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      if ((Math.floor(j/4) - Math.floor(i/4) == 0) && ((j % 4) - (i % 4) == -1) && (i != j) && (this.currentBoard[j] != "0") && (this.currentBoard[i] != "0") && (this.currentBoard[i] == this.currentBoard[j])) {
        this.currentBoard = this.currentBoard.replaceAt(j, (String(Number(this.currentBoard[j]) * 2)));
        this.currentBoard = this.currentBoard.replaceAt(i, "0");
      }
    }
  }
}

Game.prototype.clearLeft = function() {
  for (var i = 0; i < 16; i++) {
    if ((i % 4 < 3) && (this.currentBoard[i] == 0) && (this.currentBoard[i+1] != 0)) {
      this.currentBoard = this.currentBoard.replaceAt(i, this.currentBoard[i+1])
      this.currentBoard = this.currentBoard.replaceAt((i+1), "0")
    }
  }
}

Game.prototype.right = function() {
  this.moveRight();
  this.clearRight();
  this.clearRight();
  this.clearRight();
}

Game.prototype.moveRight = function() {
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      if ((Math.floor(j/4) - Math.floor(i/4) == 0) && ((j % 4) - (i % 4) == 1) && (i != j) && (this.currentBoard[j] != "0") && (this.currentBoard[i] != "0") && (this.currentBoard[i] == this.currentBoard[j])) {
        this.currentBoard = this.currentBoard.replaceAt(j, (String(Number(this.currentBoard[j]) * 2)));
        this.currentBoard = this.currentBoard.replaceAt(i, "0");
      }
    }
  }
}

Game.prototype.clearRight = function() {
  for (var i = 0; i < 16; i++) {
    if ((i % 4 > 0) && (this.currentBoard[i] == 0) && (this.currentBoard[i-1] != 0)) {
      this.currentBoard = this.currentBoard.replaceAt(i, this.currentBoard[i-1])
      this.currentBoard = this.currentBoard.replaceAt((i-1), "0")
    }
  }
}

// Game.prototype.prettyBoard = function() {
//   console.log(this.currentBoard(0,3));
//   console.log(this.currentBoard(4,7));
//   console.log(this.currentBoard(8,11))
//   console.log(this.currentBoard(12,15))
// }

