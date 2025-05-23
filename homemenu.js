// homeMenu.js
import carModels from "./carmodels.js";

export function drawMenu(selectedModel, selectedColor) {
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

