// Win: If the player has two in a row, they can place a third to get three in a row.
// Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
// Fork: Create an opportunity where the player has two threats to win (two non-blocked lines of 2).
// Blocking an opponent's fork:
//    Option 1: The player should create two in a row to force the opponent into defending, as long as it doesn't result in them creating a fork. For example, if "X" has a corner, "O" has the center, and "X" has the opposite corner as well, "O" must not play a corner in order to win. (Playing a corner in this scenario creates a fork for "X" to win.)
//    Option 2: If there is a configuration where the opponent can fork, the player should block that fork.
// Center: A player marks the center. (If it is the first move of the game, playing on a corner gives "O" more opportunities to make a mistake and may therefore be the better choice; however, it makes no difference between perfect players.)
// Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
// Empty corner: The player plays in a corner square.
// Empty side: The player plays in a middle square on any of the 4 sides.


class TTTBot {
  
  public winner: string;
  public player: string;
  protected opponent: string;
  public combos: number[][];
  protected corners: number[];
  protected sides: number[];
  
  constructor() {
    
    this.player = 'X';
    this.opponent = 'O';
    this.combos = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],
                    [0, 4, 8], [6, 4, 2]  
                  ];
    this.corners = [0, 2, 6, 8];
    this.sides = [1, 3, 5, 7];    
  }
  
  setPlayer(player: string) {
    if (player !== 'X' && player !== 'O') return false;
    this.player = player;
    if (player === 'X') {
      this.opponent = 'O';
    } else {
      this.opponent = 'X';
    }
  }

  checkWin(board: string[], mark: string): number[] {
    let result: number[] = [];
    this.combos.map(function (combo) {
      let a = combo[0];
      let b = combo[1];
      let c = combo[2];

      if (board[a] === mark && board[b] === mark && board[c] === undefined) result.push(c);
      if (board[b] === mark && board[c] === mark && board[a] === undefined) result.push(a);
      if (board[a] === mark && board[c] === mark && board[b] === undefined) result.push(b);
    });
    return result;
  }
  
  checkFork(board: string[], mark: string) {
    // To check for a fork, try every open position, and then run that through CheckWin to see if there are 2 ways to win
    let results: number[] = [];

    for (let i = 0; i < 9; i++) {
      let moveIdea = board.slice(0);
      if (moveIdea[i] === undefined) {
        moveIdea[i] = mark;
        if (this.checkWin(moveIdea, mark).length > 1) {
          results.push(i);
        }
      }
    }
    return results;
  }
  
  checkWinner(board: string[]): string {
    
    // Check to see if there is a winner
    let winner: string = undefined;
    this.combos.map(function (combo) {
      let a = combo[0];
      let b = combo[1];
      let c = combo[2];
      if (board[a] !== undefined && board[a] === board[b] && board[b] === board[c]) {
        winner = board[a];
      }
    });
    if (winner !== undefined) return winner;
    
    // Check to see if the board is full
    let openSpaces: number = 0;
    for (let i = 0; i < 9; i++) {
      if (board[i] === undefined) {
        openSpaces++;
      }
    }
    // There are more than 0 open spaces, the game isn't over yet
    if (openSpaces !== 0) return undefined;
    
    // The game is over and there is no winner
    return "Cat";
  }
  
  checkThreat(board: string[]) {
    // Check to see if we can create two in a row and threaten a win
    // In order to threaten a win, we need one position marked, and two empty positions

    let results = [];
    this.combos.map(function (combo) {
      let a = combo[0];
      let b = combo[1];
      let c = combo[2];

      if (board[a] === this.player && board[b] === undefined && board[c] === undefined) {
        results.push(b);
        results.push(c);
      }
      if (board[a] === undefined && board[b] === this.player && board[c] === undefined) {
        results.push(a);
        results.push(c);
      }
      if (board[a] === undefined && board[b] === undefined && board[c] === this.player) {
        results.push(a);
        results.push(b);
      }
    }, this);

    let uniqueResults: number[] = [];

    results.map(function (item) {
      if (uniqueResults.indexOf(item) === -1) {
        uniqueResults.push(item);
      }
    });

    return uniqueResults;
  }
  
  attemptAttack(board: string[]): number | boolean {
    // Attack the opponent, forcing them to defend
    let moves = this.checkThreat(board);
    // Eliminate any attack that would give the opponent an opportunity to fork
    moves = moves.filter(function (move) {
      let testBoard = board.slice(0);
      // First, we create a threat
      testBoard[move] = this.player;
      // What move will the opponent have to make to block our threat?
      let opponentBlock = this.checkWin(testBoard, this.player);
      // Now, check for any opportunities that the opponent has to create a fork
      let opponentForks = this.checkFork(testBoard, this.opponent);
      // If the move that the opponent must make to block our threat is in the list of opportunities for them to create a fork
      // we don't want to make that threat
      for (let i = 0; i < opponentBlock.length; i++) {
        if (opponentForks.indexOf(opponentBlock[i]) !== -1) return false;
      }
      return true;
    }, this);
    if (moves.length > 0) {
      return this.randomMove(moves);
    }
    return false;
  }
  
  playCenter(board: string[]): number | boolean {
    // How many plays are open to us?
    let plays: number = 0;
    for (let i = 0; i < 9; i++) {
      if (board[i] === undefined) {
        plays++;
      }
    }
    // If there are 9 open spaces, this is the first move. Let's take a random corner
    if (plays === 9) {
      let moves = [0, 2, 6, 8];
      return this.randomMove(moves);
    }
    // Ok, this isn't the first turn. If the middle is open, we'll play there. If not, try the next strategy
    if (board[4] === undefined) {
      return 4;
    }
    return false;
  }
  
  decideMove(board: string[]): number | boolean {
    // This function should decide the best move to make

    // If we can win, that is the move that we should choose
    let moves = this.checkWin(board, this.player);
    if (moves.length > 0) return this.randomMove(moves);

    // Next, check to see if we can block the opponent from winning
    moves = this.checkWin(board, this.opponent);
    if (moves.length > 0) return this.randomMove(moves);

    // Ok, so we can't win and we don't need to block, try to create a fork
    moves = this.checkFork(board, this.player);
    if (moves.length > 0) return this.randomMove(moves);

    // Attack the opponent, forcing them to defend (unless defending would give them a fork)
    let attack: number | boolean = this.attemptAttack(board);
    if (attack !== false) {
      return attack;
    }
    
    // Take the center, unless this is the first move. If so, take a corner.
    let centerOrCorner = this.playCenter(board);
    if (centerOrCorner !== false) {
      return centerOrCorner;
    }

    // If opponent is in a corner, take the opposite corner
    let oppositeCorners = [[0, 8], [2, 6]];
    moves = oppositeCorners.map(function (corner) {
      if (board[corner[0]] === this.opponent && board[corner[1]] === undefined) return corner[1];
      if (board[corner[1]] === this.opponent && board[corner[0]] === undefined) return corner[0];
    });
    moves = moves.filter(function (item) {
      if (item === undefined) return false;
      return true;
    });
    if (moves.length > 0) return this.randomMove(moves);

    // Just take any empty corner
    let corners = [0, 2, 6, 8];
    corners = corners.filter(function (corner) {
      if (board[corner] !== undefined) return false;
      return true;
    });
    if (corners.length > 0) return this.randomMove(corners);

    // Take any empty side
    let sides = [1, 3, 5, 7];
    sides = sides.filter(function (side) {
      if (board[side] !== undefined) return false;
      return true;
    });
    if (sides.length > 0) return this.randomMove(sides);

    // If we get to this point in the function, something is wrong
    console.log("Error! I can't find a valid move!");
    return false;
  }
  
  randomMove(moves: number[]) {
    if (moves.length > 1) {
        return moves[Math.floor(Math.random()*moves.length)];
    } else {
        return moves[0];
    }
  }
}