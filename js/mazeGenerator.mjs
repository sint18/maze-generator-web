const canvas = document.getElementById('mazeCanvas')
const ctx = canvas.getContext("2d");


const CellSize = 20 // Determines the size of each cell (px)

class Maze {
  mazeSize = 10 // Default value
  cellSize = CellSize

  constructor(mazeSize) {
    this.mazeSize = mazeSize
    this.grid = this.initialiseGrid()
    // To dynamically set the size of canvas according to size of the grid (px) and size of maze
    canvas.width = CellSize * mazeSize
    canvas.height = CellSize * mazeSize
  }

  /**
   * Initialise a grid with default values
   * @returns {[]}
   */
  initialiseGrid() {
    let grid = []
    for (let row = 0; row < this.mazeSize; row++) {
      let rowArray = []
      for (let col = 0; col < this.mazeSize; col++) {
        let cell = new Cell(row, col)
        rowArray.push(cell)
      }
      grid.push(rowArray)
    }
    return grid
  }

  checkGrid() {
    for (let row = 0; row < this.mazeSize; row++) {
      for (let col = 0; col < this.mazeSize; col++) {
        const cell = this.grid[row][col]
        console.log(`x: ${cell.row}, y: ${cell.col}, ${cell.visited}`)
      }
    }
  }

  /**
   * Draw a generated maze on canvas
   * @param grid
   */
  drawMaze(grid) {
    for (let row = 0; row < this.mazeSize; row++) {
      for (let col = 0; col < this.mazeSize; col++) {
        const cell = grid[row][col]
        cell.draw()
      }
    }

    // Show starting point
    ctx.beginPath()
    ctx.fillStyle = "Red";
    ctx.fillRect(0, 0, this.cellSize, this.cellSize)

    // Show end point
    ctx.beginPath()
    ctx.fillStyle = "Green";
    ctx.fillRect((grid.length - 1) * this.cellSize, (grid.length - 1) * this.cellSize, (grid.length - 1) * this.cellSize + this.cellSize, (grid.length - 1) * this.cellSize + this.cellSize)

  }

  /**
   * Recursively modify the grid to get a maze
   */
  generateMaze() {

    // A list of directions to loop through
    const directions = ['top', 'down', 'left', 'right']

    const directionY = {'top': -1, 'down': 1, 'left': 0, 'right': 0}
    const directionX = {'top': 0, 'down': 0, 'left': -1, 'right': 1}


    // Recursive function to carve a passage through cells
    // Stack can also be used instead of recursive function
    // Recursive is used for conciseness but the trade-off is performance
    function recursive(currentRow, currentCol, grid) {

      // Mark the current cell as visited
      grid[currentRow][currentCol].visited = true

      // To randomly shuffle the array
      // So it doesn't always go in the same direction
      const shuffledArray = directions.sort((a, b) => 0.5 - Math.random());
      shuffledArray.forEach(direction => {
        const newRow = currentRow + directionY[direction]
        const newCol = currentCol + directionX[direction]

        // Checking if a new cell is valid
        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid.length && grid[newRow][newCol].visited === false) {

          // Destroying the walls of the current cell and chosen new cell
          if (direction === 'top') {
            grid[currentRow][currentCol].top = false
            grid[newRow][newCol].down = false
          } else if (direction === 'down') {
            grid[currentRow][currentCol].down = false
            grid[newRow][newCol].top = false
          } else if (direction === 'left') {
            grid[currentRow][currentCol].left = false
            grid[newRow][newCol].right = false
          } else if (direction === 'right') {
            grid[currentRow][currentCol].right = false
            grid[newRow][newCol].left = false
          }

          recursive(newRow, newCol, grid)

        }
      })

    }

    recursive(0, 0, this.grid)

    this.drawMaze(this.grid)

  }
}


/**
 * Cell class includes all info about each cell
 * Location on grid: row, col.
 * Location on the canvas: x, y.
 * Walls: top, down, left, right.
 * And visited boolean
 */
class Cell {
  size = CellSize

  constructor(row, col) {
    this.x = col * CellSize
    this.y = row * CellSize
    this.row = row
    this.col = col
    this.top = true
    this.down = true
    this.left = true
    this.right = true
    this.visited = false
  }

  /**
   * Draws a cell on canvas
   */
  draw() {
    if (this.top === true) {
      ctx.beginPath()
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.size, this.y);
      ctx.stroke();
    }
    if (this.down === true) {
      ctx.beginPath()
      ctx.moveTo(this.x, this.y + this.size);
      ctx.lineTo(this.x + this.size, this.y + this.size);
      ctx.stroke();
    }
    if (this.left === true) {
      ctx.beginPath()
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.size);
      ctx.stroke();
    }
    if (this.right === true) {
      ctx.beginPath()
      ctx.moveTo(this.x + this.size, this.y);
      ctx.lineTo(this.x + this.size, this.y + this.size);
      ctx.stroke();
    }
  }
}

export function createMaze(mazeSize) {
  const maze = new Maze(mazeSize)
  try {
    maze.generateMaze()
    maze.checkGrid()
  } catch ({name, message}) {
    console.log(name)
    console.log(message)
  }
}

