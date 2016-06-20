Game.prototype.prettyBoard = function() {
  console.clear();
  console.log(g.currentBoard.slice(0,4));
  console.log(g.currentBoard.slice(4,8));
  console.log(g.currentBoard.slice(8,12));
  console.log(g.currentBoard.slice(12,16))
}

g = new Game ([0,0,0,0,0,0,0,4,2,0,0,4,2,0,0,0,])
  g.prettyBoard();

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
  if (g.currentBoard.includes(0)) {
    g.spawnBlock()
    g.prettyBoard();
  }
});

function Game(startingBoard) {
  this.startingBoard = startingBoard || boardGenerator();
  this.currentBoard = this.startingBoard
}

function boardGenerator() {
  result = [];
  var idx1 = Math.floor(Math.random() * 16);
  var idx2 = Math.floor(Math.random() * 16);
  for(var i = 0; i < 16; i ++) {
    if (i == idx1 || i == idx2) { result.push(2); }
    else { result.push(0); }
  }
  return result;
}

Game.prototype.spawnBlock = function() {
  board = this.currentBoard;
  var idx = null;
  var newBoard = [];
  while (idx == null) {
    idx = Math.floor(Math.random() * 16);
    if (board[idx] != 0){ idx = null};
  }
  for (var i=0; i < 16; i++) {
    if (i == idx)  { newBoard.push(2); }
    else { newBoard.push(board[i]);}
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
      if ((j % 4 == i % 4) && ((j/4)-(i/4) == -1) && (i != j) && this.currentBoard[j] != 0 && this.currentBoard[i] != 0 && this.currentBoard[i] == this.currentBoard[j]) {
        this.currentBoard.splice(j, 1, (this.currentBoard[j] * 2));
        this.currentBoard.splice(i, 1, 0);
      }
    }
  }
}

Game.prototype.clearUp = function() {
  for (var i = 0; i < 16; i++) {
    if ((i/4 < 3) && (this.currentBoard[i] == 0) && (this.currentBoard[i+4] != 0)) {
      this.currentBoard.splice(i, 1, this.currentBoard[i+4])
      this.currentBoard.splice((i+4), 1, 0)
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
      if ((j % 4 == i % 4) && ((j/4)-(i/4) == 1) && (i != j) && this.currentBoard[j] != 0 && this.currentBoard[i] != 0 && this.currentBoard[i] == this.currentBoard[j]) {
        this.currentBoard.splice(j, 1, (this.currentBoard[j] * 2));
        this.currentBoard.splice(i, 1, 0);
      }
    }
  }
}

Game.prototype.clearDown = function() {
  for (var i = 0; i < 16; i++) {
    if (Math.floor(i/4) > 0 && (this.currentBoard[i] == 0) && (this.currentBoard[i-4] != 0)) {
      this.currentBoard.splice(i, 1, this.currentBoard[i-4])
      this.currentBoard.splice((i-4), 1, 0)
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
      if ((Math.floor(j/4) - Math.floor(i/4) == 0) && ((j % 4) - (i % 4) == -1) && (i != j) && (this.currentBoard[j] != 0) && (this.currentBoard[i] != 0) && (this.currentBoard[i] == this.currentBoard[j])) {
        this.currentBoard.splice(j, 1, (this.currentBoard[j] * 2));
        this.currentBoard.splice(i, 1, 0);
      }
    }
  }
}

Game.prototype.clearLeft = function() {
  for (var i = 0; i < 16; i++) {
    if ((i % 4 < 3) && (this.currentBoard[i] == 0) && (this.currentBoard[i+1] != 0)) {
      this.currentBoard.splice(i, 1, this.currentBoard[i+1])
      this.currentBoard.splice((i+1), 1, 0)
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
      if ((Math.floor(j/4) - Math.floor(i/4) == 0) && ((j % 4) - (i % 4) == 1) && (i != j) && (this.currentBoard[j] != 0) && (this.currentBoard[i] != 0) && (this.currentBoard[i] == this.currentBoard[j])) {
        this.currentBoard.splice(j, 1, (this.currentBoard[j] * 2));
        this.currentBoard.splice(i, 1, 0);
      }
    }
  }
}

Game.prototype.clearRight = function() {
  for (var i = 0; i < 16; i++) {
    if ((i % 4 > 0) && (this.currentBoard[i] == 0) && (this.currentBoard[i-1] != 0)) {
      this.currentBoard.splice(i, 1, this.currentBoard[i-1])
      this.currentBoard.splice((i-1), 1, 0)
    }
  }
}


