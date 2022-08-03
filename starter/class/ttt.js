const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor()
  {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // wasd to move cursor around
    Screen.addCommand('w', 'move cursor up', this.cursor.up);
    Screen.addCommand('a', 'move cursor left', this.cursor.left);
    Screen.addCommand('s', 'move cursor down', this.cursor.down);
    Screen.addCommand('d', 'move cursor right', this.cursor.right);
    Screen.addCommand('e', 'place marker', this.placeMarker);
    Screen.setMessage(`${this.playerTurn}'s turn\nwasd to move, e to place marker`);

    this.cursor.setBackgroundColor();
    Screen.render();
  }


  placeMarker = () => {
    let row = this.cursor.row;
    let col = this.cursor.col;
    if (this.grid[row][col] === ' ')
    {
      if (this.playerTurn === "O")
      {
        this.grid[row][col] = "O";
        Screen.setGrid(row, col, "O");
        this.playerTurn = "X";
      } else {
        this.grid[row][col] = "X";
        Screen.setGrid(row, col, "X");
        this.playerTurn = "O";
     }
     Screen.setMessage(`${this.playerTurn}'s turn\nwasd to move, e to place marker`);
    }
    else
    {
      Screen.setMessage(`${this.playerTurn}'s turn\nwasd to move, e to place marker\nInvalid move`);
    }
    let winner = TTT.checkWin(this.grid)
    if (winner)
    {
      TTT.endGame(winner);
    }

    Screen.render();
  }

  static checkWin(grid)
  {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended


    // check for winner on horizontal axis
    let horizontalWinner = TTT.checkHorizontal(grid);
    if (horizontalWinner)
    {
      return horizontalWinner;
    }

    // check for winner on vertical axis
    let verticalWinner = TTT.checkVertical(grid);
    if (verticalWinner)
    {
      return verticalWinner;
    }

    // check for winner on left diagonal
    let leftDiagonalWinner = TTT.checkLeftDiagonal(grid);
    if (leftDiagonalWinner)
    {
      return leftDiagonalWinner;
    }

    // check for winner on right diagonal
    let rightDiagonalWinner = TTT.checkRightDiagonal(grid);
    if (rightDiagonalWinner)
    {
      return rightDiagonalWinner;
    }


    // determine if spaces are open
    let gridFilled = TTT.isFilled(grid);
    if (gridFilled)
    {
      return 'T';
    }
    else
    {
      return false;
    }

  }


  static checkHorizontal(grid)
  {
    // check each row
    for (let i = 0; i < 3; i++)
    {
      // in that row check to see if anything isn't x or o
      let xWins = true;
      let oWins = true;
      for (let j = 0; j < 3; j++)
      {
        if (grid[i][j] !== 'X')
        {
          xWins = false;
        }
        if (grid[i][j] !== 'O')
        {
          oWins = false;
        }
      }
      // if all Xs, X wins
      if (xWins)
      {
        return 'X';
      }
      // if all Os, O wins
      if (oWins)
      {
        return 'O';
      }
    }
    return false;
  }

  static checkVertical(grid)
  {
    // check each column
    for (let i = 0; i < 3; i++)
    {
      // in that column check to see if anything isn't x or o
      let xWins = true;
      let oWins = true;
      for (let j = 0; j < 3; j++)
      {
        if (grid[j][i] !== 'X')
        {
          xWins = false;
        }
        if (grid[j][i] !== 'O')
        {
          oWins = false;
        }
      }
      // if all Xs, X wins
      if (xWins)
      {
        return 'X';
      }
      // if all Os, O wins
      if (oWins)
      {
        return 'O';
      }
    }
    return false;
  }



  static checkLeftDiagonal(grid)
  {
    // check top left to bottom right for winner
    let xWins = true;
    let oWins = true;
    for (let i = 0; i < 3; i++)
    {
      if (grid[i][i] !== 'X')
      {
        xWins = false;
      }
      if (grid[i][i] !== 'O')
      {
        oWins = false;
      }
    }
    // if all Xs, X wins
    if (xWins)
    {
      return 'X';
    }
    // if all Os, O wins
    if (oWins)
    {
      return 'O';
    }
    return false;
  }

  static checkRightDiagonal(grid)
  {
    // check top left to bottom right for winner
    let xWins = true;
    let oWins = true;
    for (let i = 0; i < 3; i++)
    {
      // use [2 - i] as column to traverse right to left
      if (grid[i][2 - i] !== 'X')
      {
        xWins = false;
      }
      if (grid[i][2 - i] !== 'O')
      {
        oWins = false;
      }
    }
    // if all Xs, X wins
    if (xWins)
    {
      return 'X';
    }
    // if all Os, O wins
    if (oWins)
    {
      return 'O';
    }
    return false;
  }



  static isFilled(grid)
  {
    // go through entire grid to see if it is filled;
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 3; j++)
      {
        if (grid[i][j] === ' ')
        {
          return false;
        }
      }
    }
    return true;
  }

  static endGame(winner)
  {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;

grid = [[' ',' ','O'],
        [' ','O',' '],
        ['O',' ',' ']];

console.log(TTT.checkRightDiagonal(grid));
