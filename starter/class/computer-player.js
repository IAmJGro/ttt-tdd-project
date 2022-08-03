
class ComputerPlayer {

  static getValidMoves(grid)
  {
    // gets a list of open spaces
    let validMoves = [];
    for (let row = 0; row < grid.length; row++)
    {
      for (let col = 0; col < grid[row].length; col++)
      {
        if (grid[row][col] === ' ')
        {
          validMoves.push({row: row, col: col});
        }
      }
    }
    return validMoves;
  }

  static randomMove(grid)
  {
    // just any valid move
    let validMoves = this.getValidMoves(grid);
    let moveNumber = Math.floor(Math.random() * validMoves.length);
    return validMoves[moveNumber];
  }

  static getWinningMoves(grid, symbol)
  {
    // gets an array of winning moves rather than a single one b/c
    // that helps function that avoids opponent double winning move situations
    let winningMoves = [];
    let horizWinner = this.checkHorizontalWinner(grid, symbol);
    if (horizWinner)
    {
      winningMoves.push(horizWinner);
    }

    let vertWinner = this.checkVerticalWinner(grid, symbol);
    if (vertWinner)
    {
      winningMoves.push(vertWinner);
    }

    let diagWinner = this.checkDiagWinner(grid, symbol);
    if (diagWinner)
    {
      winningMoves.push(diagWinner);
    }

    if (winningMoves.length > 0)
    {
      return winningMoves;
    }
    return false;
  }

  static checkHorizontalWinner(grid, symbol)
  {
    // checks to see if there are any rows with two of symbol and a blank
    // returns the blank as the winning move
    for (let row = 0; row < grid.length; row++)
    {
      let symbols = 0;
      let emptyLocation = null;
      for (let col = 0; col < grid[row].length; col++)
      {
        if (grid[row][col] === symbol)
        {
          symbols++;
        }
        else if (grid[row][col] === ' ')
        {
          emptyLocation = {row: row, col: col};
        }
      }
      if (symbols === 2 && emptyLocation)
      {
        return emptyLocation;
      }
    }
    return false;
  }

  static checkVerticalWinner(grid, symbol)
  {
    // checks to see if there are any columns with two of symbol and a blank
    // returns winning moves
    // assumes that grid lines are of equal length
    for (let col = 0; col < grid[0].length; col++)
    {
      let symbols = 0;
      let emptyLocation = null;
      for (let row = 0; row < grid.length; row++)
      {
        if (grid[row][col] === symbol)
        {
          symbols++;
        }
        else if (grid[row][col] === ' ')
        {
          emptyLocation = {row: row, col: col};
        }
      }
      if (symbols === 2 && emptyLocation)
      {
        return emptyLocation;
      }
    }
    return false;
  }

  static checkDiagWinner(grid, symbol)
  {
    // assumes square grid, checks backslash for two of symbol and a blank
    // returns blank
    let symbols = 0;
    let emptyLocation = null;
    for (let loc = 0; loc < grid.length; loc++)
    {
      if (grid[loc][loc] === symbol)
      {
        symbols++;
      }
      else if (grid[loc][loc] === ' ')
      {
        emptyLocation = {row: loc, col: loc};
      }
    }
    if (symbols === 2 && emptyLocation)
    {
       return emptyLocation;
    }

    // check forward slash
    // looks for two symbols and a blank, returns blank
    symbols = 0;
    emptyLocation = null;
    for (let row = 0; row < grid.length; row++)
    {
      let col = (grid.length - 1) - row;
      if (grid[row][col] === symbol)
      {
        symbols++;
      }
      else if (grid[row][col] === ' ')
      {
        emptyLocation = {row: row, col: col};
      }
    }
    if (symbols === 2 && emptyLocation)
    {
      return emptyLocation;
    }

    return false;
  }

  static getOpposingSymbol(symbol)
  {
    // just flips the symbol to check for defensive moves
    if (symbol === "X")
    {
      symbol = "O";
    }
    else
    {
      symbol = "X";
    }
    return symbol;
  }

  static blockDoubleWinner(grid, opposingSymbol)
  {
    // checks hypothetical next moves from opponent that would create
    // a situation in which they would win twice
    // returns that location so that AI will place its next mark there
    for (let row = 0; row < grid.length; row++)
    {
      for (let col = 0; col < grid[row].length; col++)
      {
        if (grid[row][col] === " ")
        {
          grid[row][col] = opposingSymbol;
          let winners = this.getWinningMoves(grid, opposingSymbol);
          grid[row][col] = " ";
          if (winners.length > 1)
          {
            return {row: row, col: col};
          }
        }
      }
    }
    return false;
  }

  static getMoveNumber(grid)
  {
    // returns the move number, starting at move #1, based on number of marks
    // on the board
    let moveNumber = 1;
    for (let i = 0; i < grid.length; i++)
    {
      for (let j = 0; j < grid[i].length; j++)
      {
        if (grid[i][j] !== ' ')
        {
          moveNumber++;
        }
      }
    }
    return moveNumber;
  }

  static getSpecialMove(grid, opposingSymbol)
  {
    // if AI is going second and opponent takes center
    // must take corner. If opponent can does,
    // will have two potential double winner moves and be unblockable
    let moveNumber = this.getMoveNumber(grid);
    if (moveNumber === 2 && grid[1][1] === opposingSymbol)
    {
      return {row: 0, col: 0};
    }
    // program will ALWAYS place AI mark in center if opponent doesn't start there
    // if opponent has the two corners, they have two potential double winners
    // to avoid loss here, force opponent to defend against winning moves with
    // a move that doesn't set up a double winner - any side rather than corner
    // will work
    if (moveNumber === 4 &&
        (grid[0][0] === opposingSymbol && grid[2][2] === opposingSymbol ||
         grid[2][0] === opposingSymbol && grid[0][2] === opposingSymbol))
    {
      return {row: 0, col: 1};
    }
  }

  static getSmartMove(grid, symbol)
  {
    // first priority: win if winning move available
    let winner = this.getWinningMoves(grid, symbol)
    if (winner)
    {
      return winner[0];
    }

    // just getting opposing player's symbol for ease
    let opposingSymbol = this.getOpposingSymbol(symbol);

    // second priority: block any immediately winning move
    // subsequent sections should make it so there are never two winning moves
    let block = this.getWinningMoves(grid, opposingSymbol)
    if (block)
    {
      return block[0];
    }

    // two special cases for responses to early moves to prevent definite
    // wins for opponent must come before blockDW b/c trying to block a double
    // winner when opponent has both corners will make AI lose
    let specialMove = this.getSpecialMove(grid, opposingSymbol);
    if (specialMove)
    {
      return specialMove;
    }

    // third priority: block any move that will result into possible winning
    // moves for opponent
    let blockDW = this.blockDoubleWinner(grid, opposingSymbol)
    if (blockDW)
    {
      return blockDW;
    }

    // if nothing more pressing, take the center
    if (grid[1][1] === " ")
    {
      return {row: 1, col: 1};
    }

    // if nothing more pressing just do something random
    return this.randomMove(grid);
  }

}

module.exports = ComputerPlayer;
