// homeMenu.js
import carModels from "./carmodels.js";

export const LEVEL_COUNT = 10;

export function drawMenu(selectedModel, selectedColor, selectedLevelIdx = 0) {
  fill(255);
  textSize(32);
  text("Hill Climb Racing - Select Car Model & Color", width / 2, 60);

  let xStart = width / 2 - 250;
  let y = 120;
  let i = 0;
  for (let key in carModels) {
    let x = xStart + i * 100;
    fill(key === selectedModel ? "yellow" : carModels[key].color);
    rect(x, y, 80, 50, 10);
    fill(0);
    textSize(12);
    text(carModels[key].name, x, y + 35);
    i++;
  }
  
  text("Selected option highlights yellow", width / 2, y - 33);
  


  // Color selection
  let colors = ["white", "blue", "red", "green", "gray", "black", "purple"];
  y = 200;
  fill(255);
  textSize(20);
  text("Select Car Color", width / 2, y - 30);
  i = 0;
  for (let c of colors) {
    let x = xStart + i * 70;
    fill(c);
    stroke(c === selectedColor ? "yellow" : c);
    strokeWeight(c === selectedColor ? 4 : 1);
    ellipse(x, y, 40);
    noStroke();
    i++;
  }

  // Level selection
  let levelText = selectedLevelIdx < LEVEL_COUNT
    ? `Level: ${selectedLevelIdx + 1}`
    : "Level: Infinity";
  fill(255);
  textSize(20);
  text(levelText, width / 2, 260);

  // Start button
  fill(0, 150, 0);
  rect(width / 2, height - 60, 150, 50, 10);
  fill(255);
  textSize(24);
  text("START", width / 2, height - 60);

  // Permanent last distance & best distance box (bottom right)
  let lastDistance = localStorage.getItem("lastDistanceTemp");
  let bestDistance = localStorage.getItem("bestDistanceTemp");
  if (lastDistance !== null) lastDistance = Number(lastDistance);

  // Update bestDistance if needed
  if (lastDistance !== null && (!bestDistance || lastDistance > Number(bestDistance))) {
    bestDistance = lastDistance;
    localStorage.setItem("bestDistanceTemp", bestDistance);
  } else if (bestDistance !== null) {
    bestDistance = Number(bestDistance);
  }

  let boxW = 220;
  let boxH = 60;
  let boxX = width - boxW / 2 - 20;
  let boxY = height - boxH / 2 - 20;

  fill(0, 0, 0, 180);
  rect(boxX, boxY, boxW, boxH, 10);
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text(
    "Last Distance: " + (lastDistance !== null ? lastDistance + " m" : "-") +
    "\nBest Distance: " + (bestDistance !== null ? bestDistance + " m" : "-"),
    boxX - boxW / 2 + 10, boxY - boxH / 2 + 8
  );
  textAlign(CENTER, CENTER);
}



export function handleMenuClick(mx, my, selectedModel, selectedColor) {
  let xStart = width / 2 - 250;
  let yModels = 120;
  let i = 0;

  let result = { selectedModel: null, selectedColor: null, start: false };

  for (let key in carModels) {
    let x = xStart + i * 100;
    if (mx > x - 40 && mx < x + 40 && my > yModels - 25 && my < yModels + 25) {
      result.selectedModel = key;
    }
    i++;
  }

  let colors = ["white", "blue", "red", "green", "gray", "yellow", "purple"];
  let yColors = 200;
  i = 0;
  for (let c of colors) {
    let x = xStart + i * 70;
    let d = dist(mx, my, x, yColors);
    if (d < 20) {
      result.selectedColor = c;
    }
    i++;
  }

  if (mx > width / 2 - 75 && mx < width / 2 + 75 && my > height - 85 && my < height - 35) {
    result.start = true;
  }

  return result;
}

// Default menu state for initialization
export const defaultMenuState = {
  focus: "car", // "car", "color", or "level"
  modelIdx: 0,
  colorIdx: 0,
  levelIdx: 0, // 0-9 for levels 1-10, 10 for infinity
  start: false
};

// Helper: get arrays for models/colors and current indices
export function getMenuSelectionIndices(selectedModel, selectedColor) {
  const modelKeys = Object.keys(carModels);
  const colorList = ["white", "blue", "red", "green", "gray", "black", "purple"];
  const modelIdx = modelKeys.indexOf(selectedModel);
  const colorIdx = colorList.indexOf(selectedColor);
  return { modelIdx, colorIdx, modelKeys, colorList };
}

// Helper: get model/color by indices
export function setMenuSelectionByIndices(modelIdx, colorIdx) {
  const modelKeys = Object.keys(carModels);
  const colorList = ["white", "blue", "red", "green", "gray", "black", "purple"];
  return {
    selectedModel: modelKeys[modelIdx],
    selectedColor: colorList[colorIdx]
  };
}

// Enhanced menu navigation with focus state
export function menuKeyPressed(keyCode, menuState) {
  // menuState: {focus, modelIdx, colorIdx, start}
  const modelKeys = Object.keys(carModels);
  const colorList = ["white", "blue", "red", "green", "gray", "black", "purple"];
  let { focus, modelIdx, colorIdx, levelIdx } = menuState;
  let start = false;

  if (focus === "car") {
    if (keyCode === LEFT_ARROW) {
      modelIdx = (modelIdx - 1 + modelKeys.length) % modelKeys.length;
    } else if (keyCode === RIGHT_ARROW) {
      modelIdx = (modelIdx + 1) % modelKeys.length;
    } else if (keyCode === ENTER || keyCode === 32) { // 32 = Space
      focus = "color";
    } else if (keyCode === UP_ARROW) {
      focus = "level";
    }
  } else if (focus === "color") {
    if (keyCode === LEFT_ARROW || keyCode === UP_ARROW) {
      colorIdx = (colorIdx - 1 + colorList.length) % colorList.length;
    } else if (keyCode === RIGHT_ARROW || keyCode === DOWN_ARROW) {
      colorIdx = (colorIdx + 1) % colorList.length;
    } else if (keyCode === ENTER || keyCode === 32) {
      start = true;
    } else if (keyCode === DOWN_ARROW) {
      focus = "level";
    }
  } else if (focus === "level") {
    if (keyCode === UP_ARROW) {
      levelIdx = (levelIdx - 1 + (LEVEL_COUNT + 1)) % (LEVEL_COUNT + 1);
    } else if (keyCode === DOWN_ARROW) {
      levelIdx = (levelIdx + 1) % (LEVEL_COUNT + 1);
    } else if (keyCode === ENTER || keyCode === 32) {
      start = true;
    } else if (keyCode === LEFT_ARROW) {
      focus = "car";
    } else if (keyCode === RIGHT_ARROW) {
      focus = "color";
    }
  }

  return {
    focus,
    modelIdx,
    colorIdx,
    levelIdx,
    start
  };
}

// Utility to get selectedModel/selectedColor/selectedLevel from menuState
export function getMenuSelectionFromState(menuState) {
  const modelKeys = Object.keys(carModels);
  const colorList = ["white", "blue", "red", "green", "gray", "black", "purple"];
  return {
    selectedModel: modelKeys[menuState.modelIdx],
    selectedColor: colorList[menuState.colorIdx],
    selectedLevelIdx: menuState.levelIdx
  };
}

