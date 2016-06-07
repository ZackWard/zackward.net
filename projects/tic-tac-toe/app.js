function drawBoard(board) {
  for (let i = 0; i < 9; i++) {
    let elementName = "#" + i;
    if (board[i] === undefined) {
      $(elementName).html("<h1></h1>");
    } else if (board[i] === 'X') {
      $(elementName).html('<h1><i class="fa fa-times" aria-hidden="true"></i></h1>');
    } else {
      $(elementName).html('<h1><i class="fa fa-circle-o" aria-hidden="true"></i></h1>');
    }
  }
}

function clearBoard(board) {
  for (let i = 0; i < 9; i++) {
    board[i] = undefined;
    $('#' + i).removeClass('winner');
  }
  drawBoard(board);
}

function showWinner(board) {
  let winner = myBot.checkWinner(board);
  if (winner === undefined) return false;
  boardLocked = true;

  // We have a winner! Highlight the cells that won the game
  myBot.combos.map(function (combo) {
    let a = combo[0];
    let b = combo[1];
    let c = combo[2];

    if (board[a] !== undefined && board[a] === board[b] && board[b] === board[c]) {
      $('#' + a).addClass('winner');
      $('#' + b).addClass('winner');
      $('#' + c).addClass('winner');
    }
  });

  // Wait for a moment
  window.setTimeout(function () {
    clearBoard(board);
    drawBoard(board);
    boardLocked = false;

    // If myBot is playing X, go ahead and take a turn
    if (myBot.player === 'X') {
      let botMove = myBot.decideMove(board);
      board[botMove] = 'X';
      drawBoard(board);
    }
  }, 1500);
  return true;
  
}

let board = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
let myBot = new TTTBot();
// Default to the computer being O, player being X
myBot.setPlayer('O');
let currentPlayer = 'X';
let boardLocked = false;
let xWins = 0;
let oWins = 0;
let catGames = 0;



$(document).ready(function () {
  // Set up game
  $('#dialog').modal('show');
  
  $('#playerX').on('click', function (e) {
    clearBoard(board);
    currentPlayer = 'X';
    myBot.setPlayer('O');
    $('#dialog').modal('hide');
  });
  
  $('#playerO').on('click', function (e) {
    clearBoard(board);
    currentPlayer = 'O';
    myBot.setPlayer('X');
    $('#dialog').modal('hide');
    
    // Since the player has selected O, start a new game and the bot will go first
    let botMove = myBot.decideMove(board);
    board[botMove] = 'X';
    drawBoard(board);
    
  });
  
  $('#options button').on('click', function (e) {
    $('#dialog').modal('show');
  });
  
  $('.board td').on('click', function (e) {
    e.preventDefault();
    
    // First, process the player's move, redraw the board, and check for a winner
    let cellName = $(this).attr('id');
    if (board[cellName] !== undefined || boardLocked === true) return;
    board[cellName] = currentPlayer;
    drawBoard(board);
    if (showWinner(board) !== false) {
      return;
    };
    
    // Then, do the same for the bot
    let myMove = myBot.decideMove(board);
    board[myMove] = myBot.player;
    drawBoard(board);
    showWinner(board);
  });
});