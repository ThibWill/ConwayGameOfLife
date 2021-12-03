window.onload = () => {
  const MAX_HEIGHT = window.innerHeight;
  const MAX_WIDTH = window.innerWidth;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = MAX_HEIGHT;
  canvas.width = MAX_WIDTH;
  document.body.append(canvas);
  
  const SIZE_CELL = 20;
  const GRID = {
    length: Math.ceil(MAX_WIDTH / SIZE_CELL),
    height: Math.ceil(MAX_HEIGHT / SIZE_CELL)
  }
  let stateGrid = Array(GRID.length).fill('').map(e=>Array(GRID.height).fill(false));

  canvas.addEventListener('click', (e)=> {
    stateGrid[Math.floor(e.offsetX/SIZE_CELL)][Math.floor(e.offsetY/SIZE_CELL)] = true;
    drawGrid(); 
  })
  stateGrid[20][11] = true;
  stateGrid[20][12] = true;
  stateGrid[20][13] = true;
  stateGrid[20][14] = true;
  stateGrid[20][15] = true;
  stateGrid[20][16] = true;
  stateGrid[20][17] = true;

  function drawGrid() {
    context.strokeStyle='#FFDAC1';
    context.fillStyle='grey';
    context.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    for (let i = 0; i < stateGrid.length; i++) {
      for (let j = 0; j < stateGrid[i].length; j++) {
        if (!stateGrid[i][j]) {
          context.fillRect(i * SIZE_CELL, j * SIZE_CELL, SIZE_CELL, SIZE_CELL);
          context.strokeRect(i * SIZE_CELL, j * SIZE_CELL, SIZE_CELL, SIZE_CELL);
        } else {
          
        }
      }
    }
  }
  drawGrid();

  function game() {
    function lifeOrDeath(x, y) {
      let neighbours = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (x + i >= 0 && x + i < GRID.length && y + j >= 0 &&
             y + j < GRID.height && !(i === 0 && j === 0)) {
            if (stateGrid[x + i][y + j]) {
              neighbours += 1;
            }
          }
        }
      }
      if (!stateGrid[x][y] && neighbours === 3) {
        return true;
      } else if (stateGrid[x][y] && (neighbours === 2 || neighbours === 3)) {
        return true;
      }
      return false;
    }
  
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
  setInterval(game(), 350);
}

