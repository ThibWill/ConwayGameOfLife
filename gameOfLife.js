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

  function drawGrid() {
    context.strokeStyle = '#FFDAC1';
    context.fillStyle = 'grey';
    context.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    for (let i = 0; i < stateGrid.length; i++) {
      for (let j = 0; j < stateGrid[i].length; j++) {
        if (!stateGrid[i][j]) {
          context.fillRect(i * SIZE_CELL, j * SIZE_CELL, SIZE_CELL, SIZE_CELL);
          context.strokeRect(i * SIZE_CELL, j * SIZE_CELL, SIZE_CELL, SIZE_CELL);
        }
      }
    }
  }
  drawGrid();

  canvas.addEventListener('click', (e) => {
    stateGrid[Math.floor(e.offsetX/SIZE_CELL)][Math.floor(e.offsetY/SIZE_CELL)] = true;
    drawGrid(); 
  });

  /*window.addEventListener('resize', function() {
    console.log("hello")
  });*/

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
      return (!stateGrid[x][y] && neighbours === 3) || (stateGrid[x][y] && (neighbours === 2 || neighbours === 3));
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
        stateGrid = Array(GRID.length).fill('').map(e=>Array(GRID.height).fill(false));
        stopInterval();
        drawGrid();
      });
    })();
  })();
}

