/**
 * @author Thibault Willer
 * Date: 07/12/2021
 */
window.onload = () => {
  let maxHeight, maxWidth, grid, stateGrid;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const SIZE_CELL = 20;
  document.body.append(canvas);

  /**
   * Draw the grid on the canvas
   */
  function drawGrid() {
    context.strokeStyle = '#FFDAC1';
    context.fillStyle = 'grey';
    context.clearRect(0, 0, maxWidth, maxHeight);
    for (let i = 0; i < stateGrid.length; i++) {
      for (let j = 0; j < stateGrid[i].length; j++) {
        if (!stateGrid[i][j]) {
          context.fillRect(i * SIZE_CELL, j * SIZE_CELL, SIZE_CELL, SIZE_CELL);
          context.strokeRect(i * SIZE_CELL, j * SIZE_CELL, SIZE_CELL, SIZE_CELL);
        }
      }
    }
  }

  /**
   * Initialize the canvas, and the model stateGrid
   * which is a 2D array, fill with false.
   * False => cell is dead
   * True => cell is alive
   */
  function initialize() {
    maxHeight = window.innerHeight;
    maxWidth = window.innerWidth;
    canvas.height = maxHeight;
    canvas.width = maxWidth;
    grid = {
      length: Math.ceil(maxWidth / SIZE_CELL),
      height: Math.ceil(maxHeight / SIZE_CELL)
    }
    stateGrid = Array(grid.length).fill('').map(e=>Array(grid.height).fill(false));
    drawGrid();
  }
  initialize();

  /**
   * Contains all the game's logic
   * @returns function gameOfLife
   */
  function game() {
    /**
     * Define if a cell will be alive or dead in the next round
     * @param {number} x Coordinate x of the cell
     * @param {number} y Coordinate y of the cell
     * @returns {boolean}
     */
    function lifeOrDeath(x, y) {
      let neighbours = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (x + i >= 0 && x + i < grid.length && y + j >= 0 &&
             y + j < grid.height && !(i === 0 && j === 0)) {
            if (stateGrid[x + i][y + j]) {
              neighbours += 1;
            }
          }
        }
      }
      return (!stateGrid[x][y] && neighbours === 3) || (stateGrid[x][y] && (neighbours === 2 || neighbours === 3));
    }

    /**
     * Loop over all the cells to define for each one the state
     */
    return function gameOfLife() {
      const cpyGrid = [...stateGrid.map(row=>[...row])];
      for (let i = 0; i < cpyGrid.length; i++) {
        for (let j = 0; j < cpyGrid[i].length; j++) {
          cpyGrid[i][j] = lifeOrDeath(i, j);
        }
      }
      stateGrid = cpyGrid;
      drawGrid();
    }
  }

  // Event fired when a use resize the navigator
  window.addEventListener('resize', initialize);

  // Allow the user to change the state of a cell when clicking on it
  canvas.addEventListener('click', (e) => {
    stateGrid[Math.floor(e.offsetX/SIZE_CELL)][Math.floor(e.offsetY/SIZE_CELL)] = !stateGrid[Math.floor(e.offsetX/SIZE_CELL)][Math.floor(e.offsetY/SIZE_CELL)];
    drawGrid(); 
  });

  /**
   * Launch of the game
   * Setup of the options (start, stop and reset)
   */
  (function launchGame() {
    let interval;
    function stopInterval() {
      clearInterval(interval);
      interval = undefined;
    }
    (function() {
      document.getElementById('start').addEventListener('click', () => {
        if(!interval) { interval = setInterval(game(), 350); }
      });
      document.getElementById('stop').addEventListener('click', () => {
        stopInterval();
      });
      document.getElementById('reset').addEventListener('click', () => {
        initialize()
        stopInterval();
      });
    })();
  })();
}

