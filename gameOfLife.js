document.onload = () => {
  const MAX_HEIGHT = window.innerHeight;
  const MAX_WIDTH = window.innerWidth;
  const canvas = document.createElement('canvas');
  canvas.height = MAX_HEIGHT;
  canvas.width = MAX_WIDTH;
  document.body.append(canvas);
  
  const GRID = {
    length: Math.floor(MAX_WIDTH / 20),
    height: Math.floor(MAX_HEIGHT / 20)
  }
  let stateGrid = [GRID.length][GRID.height];
  stateGrid = stateGrid.map(line=>line.fill(false));
  
  function lifeOrDeath(gridCase) {
    let neighbours  = 0;
    for(let i = -1; i <= 1; i++) {
      for(let j = -1; j <= 1; j++) {
        if(gridCase.x + i > 0 && gridCase.x + i < GRID.length && gridCase.y + j > 0 &&
           gridCase.y + j < GRID.height && i !== gridCase.x && j !== gridCase.y) {
          if(stateGrid[gridCase.x + i][gridCase.y + j] === true) {
            neighbours += 1;
          }
        }
      }
    }

    if(!stateGrid[gridCase.x + i][gridCase.x + j] && neighbours === 3) {
        return true;
    } else if(neighbours === 2 || neighbours === 3) {
      return true;
    }
    return false;
  }

  const gridCase1 = {x: 5, y:5};
  
  console.log(lifeOrDeath(gridCase1));

}

