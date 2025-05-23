// terrain.js

export let terrainPoints = [];
export let boxes = [];
export let coins = [];
export let refuelBoxes = [];
let terrainSeed = 0;
export let finishLineX = 0;
export let fuel = [];
export let distance = [];
export function setTerrainSeed(seed) {
  terrainSeed = seed;
}

function seededRandom(seed) {
  // Simple LCG for deterministic random numbers
  let m = 0x80000000, a = 1103515245, c = 12345;
  let state = seed;
  return function() {
    state = (a * state + c) % m;
    return state / m;
  };
}

export function initGame() {
  terrainPoints = [];
  boxes = [];
  coins = [];
  refuelBoxes = [];
  generateInitialTerrain();
}

function generateInitialTerrain() {
  // Use deterministic random for level generation
  let rand = seededRandom(terrainSeed || 1);

  let x = 0;
  let y = height - 100;
  let coinSpacing = 5 * 40;
  let nextCoinX = coinSpacing;
  let refuelSpacing = 30 * 40;
  let nextRefuelX = refuelSpacing;

  // Calculate finish line after 2 minutes at average speed (e.g. 5 px/frame, 60 fps)
  // 2 min * 60 fps * 5 px = 36000 px
  finishLineX = 36000;

  while (x < finishLineX + 800) {
    terrainPoints.push({ x, y });

    // Refuel alle 30 Fahrzeuglängen
    let placedRefuel = false;
    if (x >= nextRefuelX) {
      refuelBoxes.push({ x: x, y: y - 2, size: 30, used: false });
      nextRefuelX += refuelSpacing;
      placedRefuel = true;
    }

    // Coin alle 5 Fahrzeuglängen, aber nicht wenn gerade Refuel platziert wurde (Abstand 25px)
    if (x >= nextCoinX) {
      let tooCloseToRefuel = placedRefuel ||
        refuelBoxes.some(r => abs(r.x - x) < 25 && abs(r.y - (y - 30)) < 25);
      if (!tooCloseToRefuel) {
        coins.push({ x: x, y: y - 30, collected: false });
      }
      nextCoinX += coinSpacing;
    }

    x += 50 + rand() * 40; // random(50, 90)
    y += (rand() - 0.5) * 40; // random(-20, 20)
    y = constrain(y, height - 200, height - 50);
  }
}
// damage through collision with boxes needs to be implemented later also suv and monster truck gain less damage than sportscar

export function extendTerrain() {
  // No-op: Terrain is now fixed for the level, so nothing to extend.
}

export function getTerrainYAt(x) {
  for (let i = 1; i < terrainPoints.length; i++) {
    if (terrainPoints[i].x > x) {
      let p1 = terrainPoints[i - 1];
      let p2 = terrainPoints[i];
      let ratio = (x - p1.x) / (p2.x - p1.x);
      return lerp(p1.y, p2.y, ratio);
    }
  }
  return height;
}

// Helper to get terrain height at a given x (rounded to int)
function getTerrainHeightAt(x) {
  for (let i = 1; i < terrainPoints.length; i++) {
    if (terrainPoints[i].x > x) {
      let p1 = terrainPoints[i - 1];
      let p2 = terrainPoints[i];
      let ratio = (x - p1.x) / (p2.x - p1.x);
      return Math.round(lerp(p1.y, p2.y, ratio));
    }
  }
  return Math.round(height);
}

export function getTerrainSlopeAt(x) {
  for (let i = 1; i < terrainPoints.length; i++) {
    if (terrainPoints[i].x > x) {
      let p1 = terrainPoints[i - 1];
      let p2 = terrainPoints[i];
      let dx = p2.x - p1.x;
      let dy = p2.y - p1.y;
      return abs(dy / dx);
    }
  }
  return 0;
}

// Patch for dynamic fuel consumption based on terrain height
export function getDynamicFuelConsumption(carX, baseConsumption, lastHeightObj) {
  // baseConsumption: the normal fuel consumption per frame (e.g. 0.2)
  // lastHeightObj: { value: <lastHeight> } (object so it can be mutated by reference)
  let currentHeight = getTerrainHeightAt(carX);
  let lastHeight = lastHeightObj.value ?? currentHeight;
  let delta = currentHeight - lastHeight;
  lastHeightObj.value = currentHeight;

  // For every 10 units up, increase consumption by 1 fuel/sec (1/60 per frame)
  // For every 10 units down, decrease consumption by 1 fuel/sec
  // So: extra = (delta/10) * (1/60) per frame
  let extraPerFrame = (delta / 10) * (1 / 60);

  // Return the adjusted consumption for this frame
  return baseConsumption + extraPerFrame;
}

// Utility to pick a random terrain color scheme
export let terrainTextureIndex = 0;
const terrainTextures = [
  // Each entry: { ground: [r,g,b], box: [r,g,b], refuel: [r,g,b], coin: [r,g,b] }
  { ground: [60, 40, 20], box: [200, 100, 50], refuel: [255, 0, 0], coin: [255, 215, 0] },
  { ground: [80, 120, 60], box: [100, 200, 100], refuel: [0, 150, 255], coin: [255, 255, 0] },
  { ground: [100, 80, 120], box: [180, 80, 200], refuel: [255, 80, 80], coin: [255, 255, 100] },
  { ground: [120, 80, 40], box: [220, 180, 80], refuel: [0, 255, 180], coin: [255, 140, 0] }
];

// Add debug log and export terrainTextureIndex for easier debugging
export function setRandomTerrainTexture() {
  terrainTextureIndex = Math.floor(Math.random() * terrainTextures.length);
  // Debug log to confirm function is called and index is set
  console.log("Random terrain texture index set to:", terrainTextureIndex);
}

export function setTerrainTexture(index) {
  if (index >= 0 && index < terrainTextures.length) {
    terrainTextureIndex = index;
  }
}

export function drawTerrain(camX) {
  const tex = terrainTextures[terrainTextureIndex];
  stroke(80, 50, 20);
  strokeWeight(4);
  fill(...tex.ground);
  beginShape();
  vertex(camX, height);
  for (let pt of terrainPoints) {
    if (pt.x > camX - 50 && pt.x < camX + width + 50) {
      vertex(pt.x, pt.y);
    }
  }
  vertex(camX + width, height);
  endShape(CLOSE);

  fill(...tex.box);
  noStroke();
  for (let box of boxes) {
    if (!box.used && box.x > camX - 50 && box.x < camX + width + 50) {
      rect(box.x, box.y, box.size, box.size);
    }
  }

  fill(...tex.refuel);
  for (let box of refuelBoxes) {
    if (!box.used && box.x > camX - 50 && box.x < camX + width + 50) {
      rect(box.x, box.y, box.size, box.size, 5);
    }
  }

  fill(...tex.coin);
  for (let coin of coins) {
    if (!coin.collected && coin.x > camX - 50 && coin.x < camX + width + 50) {
      ellipse(coin.x, coin.y, 20);
    }
  }
}

export function isFinishLineCrossed(carX) {
  return carX >= finishLineX;
}

// Returns the current distance driven (carX - startX)
export function getDistance(carX) {
  return Math.max(0, Math.floor(carX - 50)); // 50 is the start x-position of the car, only full numbers
}

// Track distance after fuel <= 0
let distanceAfterFuelEmpty = null;
let distanceUpdateInterval = null;

export function startDistanceTracking(car) {
  if (distanceUpdateInterval) clearInterval(distanceUpdateInterval);
  distanceAfterFuelEmpty = getDistance(car.x);
  distanceUpdateInterval = setInterval(() => {
    distanceAfterFuelEmpty = getDistance(car.x);
    console.log("Distance after fuel empty updated:", distanceAfterFuelEmpty);
  }, 333); // update every 1/3 second
}

export function stopDistanceTracking() {
  if (distanceUpdateInterval) clearInterval(distanceUpdateInterval);
  distanceUpdateInterval = null;
}

export function getDistanceAfterFuelEmpty() {
  return distanceAfterFuelEmpty;
}
