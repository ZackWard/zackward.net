function drawBoard(board) {
  for (let i = 0; i < 9; i++) {
    let elementName = "#" + i;
    if (board[i] === undefined) {
      $(elementName).html("<h1></h1>");
    } else {
      $(elementName).html("<h1>" + board[i] + "</h1>");
    }
  }
}

function clearBoard(board) {
  for (let i = 0; i < 9; i++) {
    board[i] = undefined;
  }
  drawBoard(board);
}

function showWinner(board) {
  let winner = myBot.checkWinner(board);
  if (winner === undefined) return false;
  alert(winner + " wins!");
  clearBoard(board);
  drawBoard(board);
  return true;
  
}

let board = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
let myBot = new TTTBot();
// Default to the computer being O, player being X
myBot.setPlayer('O');
let currentPlayer = 'X';



$(document).ready(function () {
  // Set up game
  $('.player-select').modal('show');
  
  $('.board td').on('click', function (e) {
    e.preventDefault();
    
    // First, process the player's move, redraw the board, and check for a winner
    let cellName = $(this).attr('id');
    if (board[cellName] !== undefined) return;
    board[cellName] = currentPlayer;
    drawBoard(board);
    showWinner(board);
    
    // Then, do the same for the bot
    let myMove = myBot.decideMove(board);
    board[myMove] = myBot.player;
    drawBoard(board);
    showWinner(board);
  });
  
  $('#playerX').on('click', function (e) {
    console.log("You choose X. Clearing the board and starting a new game.");
    clearBoard(board);
    currentPlayer = 'X';
    myBot.setPlayer('O');
    $('.player-select').modal('hide');
  });
  
  $('#playerO').on('click', function (e) {
    console.log("You choose O. Clearing the board and starting a new game.");
    clearBoard(board);
    currentPlayer = 'O';
    myBot.setPlayer('X');
    $('.player-select').modal('hide');
    
    // Since the player has selected O, start a new game and the bot will go first
    let botMove = myBot.decideMove(board);
    board[botMove] = 'X';
    drawBoard(board);
    
  });
});