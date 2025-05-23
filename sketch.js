import { Car } from "./car.js";
import carModels from "./carmodels.js";
import { drawMenu, handleMenuClick } from "./homeMenu.js";
import { initGame, extendTerrain, getTerrainYAt, getTerrainSlopeAt, drawTerrain, boxes, coins, refuelBoxes, fuel, getDistance } from "./terrain.js";
import { drawHUD } from "./game.js";

let car;
let selectedModel = "car";
let selectedColor = "white";
let gameState = "menu";

let lastDistance = 0;
let stoppedTimerStarted = false;
let stoppedTimerId = null;

function setup() {
  console.log("setup() called");
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
}

function draw() {
  console.log("draw() called, gameState:", gameState);
  background(gameState === "menu" ? 50 : 100, 200, 255);

  if (gameState === "menu") {
    console.log("Drawing menu with model:", selectedModel, "color:", selectedColor);
    drawMenu(selectedModel, selectedColor);
  } else if (gameState === "play") {
    console.log("Game in play state, car.x:", car?.x, "car.fuel:", car?.fuel, "typeof car.fuel:", typeof car?.fuel);
    extendTerrain(car.x);

    let terrainY = getTerrainYAt(car.x);
    let terrainSlope = getTerrainSlopeAt(car.x);

    car.update(terrainY, terrainSlope);

    let camX = car.x - 100;
    push();
    translate(-camX, 0);

    drawTerrain(camX);

    for (let box of boxes) {
      car.collideBox(box);
    }
    for (let rbox of refuelBoxes) {
      car.refuel(rbox);
    }
    for (let coin of coins) {
      car.collect(coin);
    }

    car.draw();

    pop();

    drawHUD(car);

    // Track distance for stop detection
    let currentDistance = getDistance(car.x);

    // Redirect wenn fuel <= 0 und das Auto steht (Entfernung bleibt gleich)
    checkAndRedirect(car.fuel, currentDistance);

    lastDistance = currentDistance;
  }
}

function mousePressed() {
  console.log("mousePressed() called at", mouseX, mouseY, "gameState:", gameState);
  if (gameState === "menu") {
    const res = handleMenuClick(mouseX, mouseY, selectedModel, selectedColor);
    console.log("Menu click result:", res);
    if (res.selectedModel) selectedModel = res.selectedModel;
    if (res.selectedColor) selectedColor = res.selectedColor;
    if (res.start) {
      console.log("Starting game with model:", selectedModel, "color:", selectedColor);
      car = new Car(selectedModel, selectedColor);
      initGame();
      gameState = "play";
    }
  } else if (gameState === "play") {
    // Touch controls for gas/brake buttons
    if (
      mouseX > width - 180 &&
      mouseX < width - 80 &&
      mouseY > height - 105 &&
      mouseY < height - 55
    ) {
      console.log("Gas pressed");
      car.gasPressed = true;
    }
    if (
      mouseX > width - 310 &&
      mouseX < width - 210 &&
      mouseY > height - 105 &&
      mouseY < height - 55
    ) {
      console.log("Brake pressed");
      car.brakePressed = true;
    }
     if ( // peadle for Jumping
      mouseX > width - 440 &&
      mouseX < width - 330 &&
      mouseY > height - 105 &&
      mouseY < height - 55
    ) {
      console.log("Jump pressed");
      car.jumpPressed = true;
    }
  }
}

function mouseReleased() {
  console.log("mouseReleased() called, gameState:", gameState);
  if (gameState === "play") {
    car.gasPressed = false;
    car.brakePressed = false;
    car.jumpPressed = false;
  }
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
// Hilfsfunktion ans Ende der Datei:
function checkAndRedirect(Fuel, currentDistance) {
  // Debug: always log the value to see if the function is called
  console.log("checkAndRedirect called with Fuel:", Fuel, "typeof:", typeof Fuel, "<= 0:", Fuel <= 0, "currentDistance:", currentDistance, "lastDistance:", lastDistance);

  // Browser compatibility check for reload
  if (typeof location.reload !== "function") {
    window.alert("Error: Your browser is not supported for live updating. Please refresh the page manually.");
    return;
  }

  // Only trigger if fuel is <= 0 and car has stopped (distance does not increase)
  if (Fuel <= 0 && currentDistance === lastDistance) {
    if (!stoppedTimerStarted) {
      stoppedTimerStarted = true;
      let stoppedDistance = lastDistance; // always use lastDistance for the message
      console.log("Fuel is <= 0 and car stopped, starting reload timer... Distance:", stoppedDistance);

      // Store distance in localStorage as a temp file
      try {
        localStorage.setItem("lastDistanceTemp", stoppedDistance);
      } catch (e) {
        console.warn("Could not store distance in localStorage:", e);
      }

      // Save the distance for the timer closure
      stoppedTimerId = setTimeout(function() {
        window.alert("Hey, you are out of fuel!\nYou reached a distance of " + stoppedDistance + " meters. Please try again.");
        location.reload();
      }, 3000); // wait 3 seconds before reloading
    }
  } else {
    // Reset if car moves again or fuel is above 0
    stoppedTimerStarted = false;
    if (stoppedTimerId) {
      clearTimeout(stoppedTimerId);
      stoppedTimerId = null;
    }
  }

  // Live reload debug info (for live-server or similar tools)
  if (typeof sessionStorage !== "undefined" && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
    console.log('Live reload enabled.');
    sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
  }
}
