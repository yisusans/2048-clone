$(document).on('keyup',function(e){
  if(e.which==38) {
    console.log("up");
  };
  if(e.which==39) {
    console.log("right");
  };
  if(e.which==40) {
    console.log("down");
  };
  if(e.which==37) {
    console.log("left");
  };
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

Game.prototype.moveUp = function() {
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      if ((j % 4 == i % 4) && ((j/4)-(i/4) == -1) && (i != j) && this.currentBoard[j] != "0") {
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
