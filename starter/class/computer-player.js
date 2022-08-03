
class ComputerPlayer {

  static getValidMoves(grid) {
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

  static randomMove(grid) {

    let validMoves = this.getValidMoves(grid);
    let moveNumber = Math.floor(Math.random() * validMoves.length);
    return validMoves[moveNumber];
  }

  static getWinningMoves(grid, symbol) {

    let winner = this.checkHorizontalWinner(grid, symbol);
    console.log(winner);
    if (winner)
    {
      return winner;
    }

    winner = this.checkVerticalWinner(grid, symbol);
    console.log(winner);
    if (winner)
    {
      return winner;
    }

    winner = this.checkDiagWinner(grid, symbol);
    console.log(winner);
    if (winner)
    {
      return winner;
    }

    console.log("no winner");
    return false;
  }

  static checkHorizontalWinner(grid, symbol) {

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

  static checkVerticalWinner(grid, symbol) {

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

  static checkDiagWinner(grid, symbol) {

    // assumes square grid, checks backslash
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

    //check forward slash

    for (let loc = 0; loc < grid.length; loc++)
    {
      if (grid[loc][grid.length - loc - 1] === symbol)
      {
        symbols++;
      }
      else if (grid[loc][grid.length - loc - 1] === ' ')
      {
        emptyLocation = {row: loc, col: grid.length - loc - 1};
      }
    }
    if (symbols === 2 && emptyLocation)
    {
      return emptyLocation;
    }

    return false;
  }


  static getBlockingMoves(grid, symbol)
  {
    let opposingSymbol = this.getOpposingSymbol(symbol);
    return this.getWinningMoves(grid, opposingSymbol);
  }

  static getOpposingSymbol(symbol)
  {
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

  static checkCorners(grid, opposingSymbol)
  {
    if (grid[0][0] === opposingSymbol && grid[2][2] === " ")
    {
      return {row: 2, col: 2}
    }
    if (grid[2][2] === opposingSymbol && grid[0][0] === " ")
    {
      return {row: 0, col: 0}
    }
    if (grid[0][2] === opposingSymbol && grid[2][0] === " ")
    {
      return {row: 2, col: 0}
    }
    if (grid[2][0] === opposingSymbol && grid[0][2] === " ")
    {
      return {row: 0, col: 2}
    }
  }

  static getSmartMove(grid, symbol) {

    let winner = this.getWinningMoves(grid, symbol)
    if (winner)
    {
      return winner;
    }

    let block = this.getBlockingMoves(grid, symbol)
    if (block)
    {
      return block;
    }

    // best first move for O
    if (symbol === "O" && grid[1][1] === " ")
    {
      return {row: 1, col: 1};
    }

    // best first move for X
    if (symbol === "X" && grid[0][0] === " ")
    {
      return {row: 0, col: 0};
    }

    let opposingSymbol = this.getOpposingSymbol(symbol);

    let oppositeCorner = this.checkCorners(grid, opposingSymbol);
    if (oppositeCorner)
    {
      return oppositeCorner;
    }

    return this.randomMove(grid);
  }

}

module.exports = ComputerPlayer;
